import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("portfolio.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- Performance, Choreography, Teaching
    type TEXT NOT NULL, -- Video, Photo
    url TEXT NOT NULL,
    thumbnail TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data
const portfolioCount = db.prepare("SELECT COUNT(*) as count FROM portfolio").get() as { count: number };
// Force re-seed to ensure all items are present and correctly categorized
db.prepare("DELETE FROM portfolio WHERE category = '공연 및 출연'").run();
const insertPortfolio = db.prepare("INSERT INTO portfolio (title, category, type, url, thumbnail, description) VALUES (?, ?, ?, ?, ?, ?)");

// 2024
insertPortfolio.run("강릉페스티벌 미디어 퍼포먼스 '로스팅 드림즈' 퍼포머", "공연 및 출연", "Video", "https://youtube.com", null, "2024");
insertPortfolio.run("국립현대무용단 <구두점의 나라에서> 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2024");
insertPortfolio.run("뮤지컬 <노트르담 드 파리> 댄서", "공연 및 출연", "Video", "https://youtube.com", null, "2024");

// 2023
insertPortfolio.run("CAAG x 블랙풀댄스 안무감독, 연출 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2023");
insertPortfolio.run("독일 국제무용협회 X body talk 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2023");

// 2022
insertPortfolio.run("LG 기업 CF 여자 메인 댄서", "공연 및 출연", "Video", "https://youtube.com", null, "2022");
insertPortfolio.run("일반인무용단 '창귀 프로젝트' 연출 및 안무감독", "공연 및 출연", "Video", "https://youtube.com", null, "2022");
insertPortfolio.run("이석훈 뮤직비디오 '사랑은 또' 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2022");
insertPortfolio.run("국립현대무용단 <구두점의 나라에서> 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2022");

// 2021
insertPortfolio.run("<가연> CF 메인 모델", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("P4G 서울 정상회담 공익광고 무용수 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("개인프로젝트 솔로 댄스필름 영화 제작", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("<골든듀> 브랜드 광고촬영", "공연 및 출연", "Photo", "https://youtube.com", null, "2021");
insertPortfolio.run("Nice&slow 요가웨어 모델", "공연 및 출연", "Photo", "https://youtube.com", null, "2021");
insertPortfolio.run("CBS 노컷뉴스 개인 인터뷰 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("팔복 산업유산 활용 실감형 전시_미디어 아트 공연 <웨이브 더 팔복> 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("국립현대무용단 <구두점의 나라에서> 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2021");
insertPortfolio.run("경기창조고등학교 진로 문학 토크 콘서트 '오늘의 내가 내일의 나에게' <나만의 빛깔로 나아가는 법> 강연", "공연 및 출연", "Photo", "https://youtube.com", null, "2021");

// 2020
insertPortfolio.run("안다르 앰버서더 <움직이는 요가> 개설", "공연 및 출연", "Photo", "https://youtube.com", null, "2020");
insertPortfolio.run("경복궁 <피버> 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("KT x iPhone 케이티 아이폰 광고 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("경기국악당 <조선클럽> 공연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("현대백화점 x 앰비규어스 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("노블레스 잡지사 x 앰비규어스 촬영", "공연 및 출연", "Photo", "https://youtube.com", null, "2020");
insertPortfolio.run("앰비규어스 <피버> 신작 공연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("부산 <잠깐멈춤> 공익광고 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("틱톡 <범내려온다> 앰비규어스 촬영", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("연희축제 앰비규어스 <피버> 신작공연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("다시곰 x 앰비규어스", "공연 및 출연", "Photo", "https://youtube.com", null, "2020");
insertPortfolio.run("<유희열의 스케치북> 이날치 x 앰비규어스 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("한국관광공사 앰비규어스 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("슈퍼주니어 <SUPER clap> 뮤직비디오 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("안다르 X 요가웨이브 2020 요가위크 요가웨이브 강사", "공연 및 출연", "Photo", "https://youtube.com", null, "2020");
insertPortfolio.run("안다르 X 히든클리프 2019 요가위크 요가웨이브 강사", "공연 및 출연", "Photo", "https://youtube.com", null, "2020");
insertPortfolio.run("레인보우99 아티스트 <상패동> 뮤직비디오 안무 및 무용수 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("가수 Nive <liberated> 뮤직비디오 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("Heshe 100개의 뮤직필름 작업", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("가수 안다 <touch> 뮤직비디오 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("디마르가리따 티어터 듀엣무용전 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");
insertPortfolio.run("창작산실 <The color the way of color> 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2020");

// 2019
insertPortfolio.run("ACC 창제제작공연 뮤지컬 <무사> '계화' 역할", "공연 및 출연", "Video", "https://youtube.com", null, "2019");
insertPortfolio.run("충주 마스터쉽 마스게임 개막공연 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2019");
insertPortfolio.run("전국무용대상 안다미로컴퍼니 '짐' 무용수", "공연 및 출연", "Video", "https://youtube.com", null, "2019");
insertPortfolio.run("국립현대무용단 <라벨과 스트라빈스키> '철저하게 처절하게'", "공연 및 출연", "Video", "https://youtube.com", null, "2019");
insertPortfolio.run("국립현대무용단 '찾아가는 현대무용' 서울 아주중학교 강사", "공연 및 출연", "Photo", "https://youtube.com", null, "2019");
insertPortfolio.run("국립현대무용단 <라벨과 스트라빈스키> 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2019");

// 2018
insertPortfolio.run("국립현대무용단 <쓰리 볼레로> '철저하게 처절하게' 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2018");

// 2017
insertPortfolio.run("'어린이 추모제 나비의 꿈 <Uriwa Dance Project>' 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("'SDP 국제페스티벌, <몸의 기억>' 안무 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("남유정_현대카드 라이브러리 <만남> 무용수 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("정신여자중·고등학교 130주년 기획안무 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("류장현과 친구들 '갓잡아올린춤' 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("서울댄스컴퍼니 기획공연 1,2 안무 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("POLAND (Caro Dance) 협약, 티칭 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("얘기아트시어터 '달과 노인' 안무 및 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2017");
insertPortfolio.run("IDC 국가대표 선발대회 티칭", "공연 및 출연", "Photo", "https://youtube.com", null, "2017");

// 2016
insertPortfolio.run("생생 패스티벌 출연_IRv 개소식 출연", "공연 및 출연", "Video", "https://youtube.com", null, "2016");

// 2015
insertPortfolio.run("인천 아시안게임 개막식 공연", "공연 및 출연", "Video", "https://youtube.com", null, "2015");

// Ensure other categories are also present if not already
const otherCount = db.prepare("SELECT COUNT(*) as count FROM portfolio WHERE category != '공연 및 출연'").get() as { count: number };
if (otherCount.count === 0) {
  insertPortfolio.run("움직임 및 수업영상 아카이브", "움직임 및 수업영상", "Video", "https://www.youtube.com/playlist?list=PLUuCnxfrDH-C_zC3VFtizHrDPE9oDXR-V", "https://picsum.photos/seed/p1/800/800", "");
  insertPortfolio.run("강다솜 무용가 공식 인스타그램", "인스타그램", "Photo", "https://www.instagram.com/somday_in_may", "https://picsum.photos/seed/p3/800/800", "");
}

const reviewCount = db.prepare("SELECT COUNT(*) as count FROM reviews").get() as { count: number };
if (reviewCount.count === 0) {
  const insertReview = db.prepare("INSERT INTO reviews (author, content, rating, role) VALUES (?, ?, ?, ?)");
  insertReview.run("김○○ 학부모", "아이의 자신감이 정말 많이 늘었어요. 선생님의 세심한 지도에 감사드립니다.", 5, "키즈반 학부모");
  insertReview.run("이○○ 학생", "입시 준비하면서 막막했는데, 체계적인 커리큘럼 덕분에 원하는 학교에 합격했습니다!", 5, "입시반 졸업생");
  insertReview.run("Park Ji-won", "The most artistic and professional dance class I've ever taken. Highly recommended!", 5, "Professional Class");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    const items = db.prepare("SELECT * FROM portfolio ORDER BY created_at DESC").all();
    res.json(items);
  });

  app.post("/api/portfolio", (req, res) => {
    const { password, title, category, type, url, thumbnail, description } = req.body;
    if (password !== "1308") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const info = db.prepare(
      "INSERT INTO portfolio (title, category, type, url, thumbnail, description) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(title, category, type, url, thumbnail, description);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/portfolio/:id", (req, res) => {
    const { password } = req.body;
    if (password !== "1308") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    db.prepare("DELETE FROM portfolio WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/reviews", (req, res) => {
    const items = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
    res.json(items);
  });

  app.post("/api/reviews", (req, res) => {
    const { author, content, rating, role } = req.body;
    const info = db.prepare(
      "INSERT INTO reviews (author, content, rating, role) VALUES (?, ?, ?, ?)"
    ).run(author, content, rating, role);
    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
