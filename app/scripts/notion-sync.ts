/**
 * Notion 양방향 동기화 스크립트
 *
 * 사용법:
 *   npm run notion:pull          # Notion → 로컬
 *   npm run notion:pull:force    # 강제 Pull
 *   npm run notion:status        # 상태 확인
 *
 * 환경변수 (.env):
 *   NOTION_API_KEY
 *
 * 설정 파일:
 *   scripts/notion.config.json
 *
 * 페이지 단일 가져오기:
 *   npx tsx scripts/notion-sync.ts pull --page=<page_id> [--out=<dir>]
 *
 * 설정 파일 기반 전체 동기화:
 *   npx tsx scripts/notion-sync.ts pull
 */

import { Client } from "@notionhq/client";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 로드
config();

// ============================================
// 설정
// ============================================
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const notion = new Client({ auth: NOTION_API_KEY });

const BASE_PATH = path.join(__dirname, "..", "public", "content");
const NOTION_BASE_PATH = path.join(BASE_PATH, "_notion");
const CONFIG_PATH = path.join(__dirname, "notion.config.json");

interface DatabaseConfig {
  id: string;
  localPath: string;
}

interface NotionConfigMap {
  databases?: Record<string, { id: string }>;
  pages?: Record<string, { id: string; out?: string }>;
}

interface LoadedConfig {
  databases: Record<string, DatabaseConfig>;
  pages: Record<string, { id: string; out: string }>;
}

function loadConfig(): LoadedConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("notion.config.json 파일이 없습니다. scripts/ 경로에 추가하세요.");
  }

  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
  const parsed = JSON.parse(raw) as NotionConfigMap;

  const databasesRaw = parsed.databases || {};
  const pagesRaw = parsed.pages || {};

  const defaultPaths: Record<string, string> = {
    projects: path.join("_notion", "projects"),
    intalk: path.join("_notion", "intalk"),
    "pill-collab": path.join("_notion", "projects", "pill-recognition", "collab"),
    "rfp-collab": path.join("_notion", "projects", "rfp-rag", "collab"),
    "geo-collab": path.join("_notion", "projects", "geo-product-page", "collab"),
  };

  const dbEntries = Object.entries(databasesRaw || {});
  if (dbEntries.length === 0 && Object.keys(pagesRaw).length === 0) {
    throw new Error("notion.config.json에 최소 1개 이상 id가 필요합니다.");
  }

  const databases = dbEntries.reduce<Record<string, DatabaseConfig>>((acc, [key, value]) => {
    if (!value?.id) {
      throw new Error(`notion.config.json에 ${key} id가 필요합니다.`);
    }

    const pathSuffix = defaultPaths[key];
    if (!pathSuffix) {
      throw new Error(`notion.config.json에 정의된 ${key}의 로컬 경로 규칙이 없습니다.`);
    }

    acc[key] = { id: value.id, localPath: path.join(BASE_PATH, pathSuffix) };
    return acc;
  }, {});

  const pages = Object.entries(pagesRaw || {}).reduce<Record<string, { id: string; out: string }>>(
    (acc, [key, value]) => {
      if (!value?.id) {
        throw new Error(`notion.config.json에 ${key} 페이지 id가 필요합니다.`);
      }
      const out = value.out ? path.resolve(value.out) : path.join(NOTION_BASE_PATH, "pages", key);
      acc[key] = { id: value.id, out };
      return acc;
    },
    {}
  );

  return { databases, pages };
}

const CONFIG = loadConfig();
const DATABASES = CONFIG.databases;

// ============================================
// 유틸리티
// ============================================
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 50) || "untitled";
}

function getContentHash(content: string): string {
  return crypto.createHash("md5").update(content).digest("hex");
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function fetchPageBlocks(pageId: string): Promise<any[]> {
  const blocks: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: startCursor,
    });

    blocks.push(...response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }

  return blocks;
}

// ============================================
// Notion → Markdown 변환
// ============================================
interface RichText {
  plain_text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
  href?: string;
}

function richTextToMarkdown(richText: RichText[]): string {
  return richText
    .map((text) => {
      let content = text.plain_text;
      const ann = text.annotations || {};

      if (ann.bold) content = `**${content}**`;
      if (ann.italic) content = `*${content}*`;
      if (ann.strikethrough) content = `~~${content}~~`;
      if (ann.code) content = `\`${content}\``;
      if (text.href) content = `[${content}](${text.href})`;

      return content;
    })
    .join("");
}

function blockToMarkdown(block: any): string {
  const type = block.type;
  const data = block[type] || {};

  switch (type) {
    case "paragraph":
      const pText = richTextToMarkdown(data.rich_text || []);
      return pText ? `${pText}\n\n` : "\n";

    case "heading_1":
      return `# ${richTextToMarkdown(data.rich_text || [])}\n\n`;

    case "heading_2":
      return `## ${richTextToMarkdown(data.rich_text || [])}\n\n`;

    case "heading_3":
      return `### ${richTextToMarkdown(data.rich_text || [])}\n\n`;

    case "bulleted_list_item":
      return `- ${richTextToMarkdown(data.rich_text || [])}\n`;

    case "numbered_list_item":
      return `1. ${richTextToMarkdown(data.rich_text || [])}\n`;

    case "to_do":
      const checked = data.checked ? "x" : " ";
      return `- [${checked}] ${richTextToMarkdown(data.rich_text || [])}\n`;

    case "code":
      const lang = data.language || "";
      return `\`\`\`${lang}\n${richTextToMarkdown(data.rich_text || [])}\n\`\`\`\n\n`;

    case "quote":
      return `> ${richTextToMarkdown(data.rich_text || [])}\n\n`;

    case "divider":
      return "---\n\n";

    case "image":
      let url = "";
      if (data.type === "external") url = data.external?.url || "";
      else if (data.type === "file") url = data.file?.url || "";
      const caption = richTextToMarkdown(data.caption || []);
      return `![${caption}](${url})\n\n`;

    case "callout":
      const icon = data.icon?.emoji || "💡";
      return `> ${icon} ${richTextToMarkdown(data.rich_text || [])}\n\n`;

    default:
      return "";
  }
}

function propertiesToFrontmatter(properties: any): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [name, prop] of Object.entries(properties) as [string, any][]) {
    const type = prop.type;

    switch (type) {
      case "title":
        result[name] = richTextToMarkdown(prop.title || []);
        break;
      case "rich_text":
        result[name] = richTextToMarkdown(prop.rich_text || []);
        break;
      case "number":
        result[name] = prop.number;
        break;
      case "select":
        result[name] = prop.select?.name || null;
        break;
      case "multi_select":
        result[name] = (prop.multi_select || []).map((s: any) => s.name);
        break;
      case "date":
        result[name] = prop.date?.start || null;
        break;
      case "checkbox":
        result[name] = prop.checkbox;
        break;
      case "url":
        result[name] = prop.url;
        break;
      case "status":
        result[name] = prop.status?.name || null;
        break;
    }
  }

  return result;
}

// ============================================
// NotionSync 클래스
// ============================================
class NotionSync {
  private dbName: string;
  private dbId: string;
  private localPath: string;

  constructor(dbName: string) {
    if (!DATABASES[dbName]) {
      throw new Error(`Unknown database: ${dbName}`);
    }

    this.dbName = dbName;
    this.dbId = DATABASES[dbName].id;
    this.localPath = DATABASES[dbName].localPath;

    ensureDir(this.localPath);
  }

  async pull(force: boolean = false): Promise<void> {
    console.log(`\n📥 [${this.dbName}] Notion → 로컬 동기화...`);

    const pages = await this.fetchAllPages();
    console.log(`   Notion: ${pages.length}개 페이지`);

    let created = 0, updated = 0, skipped = 0;

    for (const page of pages) {
      try {
        const result = await this.pullPage(page, force);
        if (result === "created") created++;
        else if (result === "updated") updated++;
        else skipped++;
      } catch (e: any) {
        console.log(`   ❌ ${e.message}`);
      }
    }

    console.log(`✅ 생성 ${created}, 업데이트 ${updated}, 스킵 ${skipped}`);
  }

  async status(): Promise<void> {
    console.log(`\n📊 [${this.dbName}] 상태`);
    console.log(`   경로: ${this.localPath}`);

    const files = fs.readdirSync(this.localPath).filter((f) => f.endsWith(".md"));
    console.log(`   파일: ${files.length}개`);

    const metaFiles = fs.readdirSync(this.localPath).filter((f) => f.endsWith(".meta.json"));
    for (const metaFile of metaFiles) {
      const metaPath = path.join(this.localPath, metaFile);
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const syncedAt = meta.synced_at?.slice(0, 10) || "N/A";
      console.log(`   - ${metaFile.replace(".meta.json", "")} (동기화: ${syncedAt})`);
    }
  }

  private async fetchAllPages(): Promise<any[]> {
    const pages: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: this.dbId,
        page_size: 100,
        start_cursor: startCursor,
      });

      pages.push(...response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor || undefined;
    }

    return pages;
  }

  private async pullPage(page: any, force: boolean): Promise<string> {
    const pageId = page.id;
    const properties = page.properties || {};
    const lastEdited = page.last_edited_time || "";

    // 제목 추출
    let title = "untitled";
    for (const prop of Object.values(properties) as any[]) {
      if (prop.type === "title" && prop.title?.[0]?.plain_text) {
        title = prop.title[0].plain_text;
        break;
      }
    }

    const slug = slugify(title);
    const mdPath = path.join(this.localPath, `${slug}.md`);
    const metaPath = path.join(this.localPath, `${slug}.meta.json`);

    // 변경 확인
    if (fs.existsSync(metaPath) && !force) {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      if (meta.last_edited_time === lastEdited) {
        return "skipped";
      }
    }

    const isNew = !fs.existsSync(metaPath);

    // 블록 조회
    const blocks = await fetchPageBlocks(pageId);

    // Markdown 생성
    const frontmatter = propertiesToFrontmatter(properties);
    const lines: string[] = ["---"];

    for (const [key, value] of Object.entries(frontmatter)) {
      if (value !== null && value !== undefined) {
        lines.push(`${key}: ${JSON.stringify(value)}`);
      }
    }

    lines.push("---\n");
    lines.push(`# ${title}\n\n`);

    for (const block of blocks) {
      lines.push(blockToMarkdown(block));
    }

    const content = lines.join("\n");

    // 저장
    fs.writeFileSync(mdPath, content, "utf-8");

    const meta = {
      notion_id: pageId,
      last_edited_time: lastEdited,
      synced_at: new Date().toISOString(),
      content_hash: getContentHash(content),
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");

    console.log(`   ${isNew ? "📄" : "🔄"} ${title}`);
    return isNew ? "created" : "updated";
  }
}

async function pullSinglePage(pageId: string, outputDir: string, force: boolean): Promise<void> {
  ensureDir(outputDir);

  const page: any = await notion.pages.retrieve({ page_id: pageId });
  const properties = page.properties || {};
  const lastEdited = page.last_edited_time || "";

  let title = "untitled";
  for (const prop of Object.values(properties) as any[]) {
    if (prop.type === "title" && prop.title?.[0]?.plain_text) {
      title = prop.title[0].plain_text;
      break;
    }
  }

  const slug = slugify(title);
  const mdPath = path.join(outputDir, `${slug}.md`);
  const metaPath = path.join(outputDir, `${slug}.meta.json`);

  if (fs.existsSync(metaPath) && !force) {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    if (meta.last_edited_time === lastEdited) {
      console.log("✅ 변경 없음 (스킵)");
      return;
    }
  }

  const blocks = await fetchPageBlocks(pageId);
  const lines = blocks.map((block) => blockToMarkdown(block));
  const content = lines.join("\n");

  fs.writeFileSync(mdPath, content, "utf-8");
  const meta = {
    notion_id: pageId,
    last_edited_time: lastEdited,
    synced_at: new Date().toISOString(),
    content_hash: getContentHash(content),
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");

  console.log(`✅ 단일 페이지 저장: ${mdPath}`);
}

// ============================================
// CLI
// ============================================
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "status";
  const dbArg = args.find((a) => a.startsWith("--db="))?.split("=")[1];
  const pageArg = args.find((a) => a.startsWith("--page="))?.split("=")[1];
  const outArg = args.find((a) => a.startsWith("--out="))?.split("=")[1];
  const force = args.includes("--force");

  // 환경변수 확인
  if (!NOTION_API_KEY) {
    console.error("❌ NOTION_API_KEY가 설정되지 않았습니다.");
    process.exit(1);
  }

  if (command === "pull" && !dbArg && !pageArg) {
    const dbKeys = Object.keys(DATABASES);
    for (const dbName of dbKeys) {
      const sync = new NotionSync(dbName);
      await sync.pull(force);
    }

    const pageEntries = Object.entries(CONFIG.pages);
    for (const [, page] of pageEntries) {
      await pullSinglePage(page.id, page.out, force);
    }

    return;
  }

  if (command === "pull" && pageArg) {
    const outputDir = outArg ? path.resolve(outArg) : path.join(BASE_PATH, "pages");
    await pullSinglePage(pageArg, outputDir, force);
    return;
  }

  const databases = dbArg === "all" || !dbArg ? Object.keys(DATABASES) : [dbArg];

  for (const dbName of databases) {
    const sync = new NotionSync(dbName);

    switch (command) {
      case "pull":
        await sync.pull(force);
        break;
      case "status":
        await sync.status();
        break;
      default:
        console.log(`Usage: notion-sync <pull|status> [--db=projects|intalk|all] [--force]`);
    }
  }
}

main().catch(console.error);
