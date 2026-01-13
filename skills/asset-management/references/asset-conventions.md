# Asset Conventions

## Base paths
- Profile: `app/public/asset/images/profile/`
- Skills: `app/public/asset/images/skills/`
- Projects: `app/public/asset/images/projects/`
- Misc: `app/public/asset/images/misc/`
- Notion 원본: `app/public/content/_notion/` (이미지는 별도 저장 권장)

## Naming
- Lowercase with hyphens: `profile-main.png`, `react-logo.svg`
- Keep one concept per file name.

## Formats
- Preferred: `.png` or `.svg` (logos), `.webp` for photos if available.
- Avoid spaces or Korean characters in file names.

## Sizing hints
- Profile: square 512x512 (or 640x640).
- Skill logos: 64x64 or 96x96.
- Project images: 1200px width baseline.

## Usage
- Use `/asset/...` URLs when referencing files in React or Markdown.
