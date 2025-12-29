import "./landing-example.css";

type Highlight = {
  title: string;
  desc: string;
};

type Project = {
  title: string;
  desc: string;
  tag: string;
};

const highlights: Highlight[] = [
  { title: "문제 정의", desc: "요구사항을 구조화하고 RAG 목표를 명확히 설정" },
  { title: "구현", desc: "React + TypeScript 정적 페이지로 핵심 정보 구성" },
  { title: "배포", desc: "Firebase Hosting 기반의 빠른 배포 루틴" },
];

const projects: Project[] = [
  { title: "알약 이미지 인식", desc: "객체 탐지 기반 의료 도메인 프로젝트", tag: "AI" },
  { title: "RFP RAG 시스템", desc: "문서 요약·질의응답 자동화", tag: "RAG" },
  { title: "GEO 상세페이지", desc: "소상공인 콘텐츠 자동 생성", tag: "GEO" },
];

export default function LandingExample() {
  return (
    <div className="landing">
      <header className="landing__hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">AI · RAG · Full-Stack</p>
          <h1>정영선 포트폴리오</h1>
          <p className="hero__lead">
            프론트는 정적 콘텐츠의 소스 오브 트루스로 유지하고, 백엔드는
            RAG로 질문에 답합니다.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary">프로젝트 보기</button>
            <button className="btn">이력서 보기</button>
          </div>
        </div>
        <div className="hero__card">
          <div className="hero__avatar" />
          <div className="hero__meta">
            <div className="meta__title">한 줄 소개</div>
            <div className="meta__desc">문제 정의에서 배포까지 실행하는 개발자</div>
          </div>
        </div>
      </header>

      <section className="landing__section">
        <h2>핵심 역량</h2>
        <div className="grid grid--3">
          {highlights.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__section">
        <h2>프로젝트 하이라이트</h2>
        <div className="grid grid--3">
          {projects.map((proj) => (
            <div className="card" key={proj.title}>
              <span className="tag">{proj.tag}</span>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <button className="link">상세 보기</button>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__section">
        <h2>챗봇 안내</h2>
        <div className="chat">
          <p>질문하면 관련 페이지로 바로 안내합니다.</p>
          <div className="chat__input">
            <span className="chat__placeholder">예: RAG 프로젝트 설명해줘</span>
            <button className="btn btn--primary">전송</button>
          </div>
        </div>
      </section>

      <section className="landing__section">
        <h2>연락처</h2>
        <div className="contact">
          <div>이메일: joungyoungsun20@gmail.com</div>
          <div>GitHub: github.com/YS-2357</div>
          <div>블로그: velog.io/@ys2357/posts</div>
        </div>
      </section>
    </div>
  );
}
