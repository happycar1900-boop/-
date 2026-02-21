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
if (portfolioCount.count === 0) {
  const insertPortfolio = db.prepare("INSERT INTO portfolio (title, category, type, url, thumbnail) VALUES (?, ?, ?, ?, ?)");
  insertPortfolio.run("2024 Spring Performance", "Performance", "Video", "https://youtube.com", "https://picsum.photos/seed/p1/800/800");
  insertPortfolio.run("Contemporary Flow", "Choreography", "Video", "https://youtube.com", "https://picsum.photos/seed/p2/800/800");
  insertPortfolio.run("Youth Class Highlights", "Teaching", "Photo", "https://picsum.photos/seed/p3/800/800", "https://picsum.photos/seed/p3/800/800");
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
