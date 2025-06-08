// scripts/generate-thumbnails.ts
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import builderComponents from "../lib/builder-components";
import Routes from "@/lib/routes";

async function createThumbnail(componentId: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const previewUrl = `http://localhost:3000/${Routes.previewComponent(componentId)}`;
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(previewUrl, { waitUntil: "networkidle2" });

  const outputDir = path.join(process.cwd(), "public", "images", "component-thumbnails");

  // Ensure the directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${componentId}.png`) as `${string}.png`;

  await page.screenshot({
    path: filePath,
    fullPage: false,
  });

  await browser.close();
  console.log(`✅ Screenshot saved: ${filePath}`);
}

async function main() {
  for (const component of builderComponents) {
    try {
      await createThumbnail(component.id);
    } catch (err) {
      console.error(`❌ Failed to capture ${component.id}:`, err);
    }
  }
}

main();
