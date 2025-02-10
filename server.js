import express from "express";
import cors from "cors";
import { chromium } from "playwright";

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/scrape", async (req, res) => {
  let browser;

  try {
    browser = await chromium.launch();
    const listings = await scrapeListings({ browser, retryCount: 3 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Scraper server running on http://localhost:${PORT}`);
});
