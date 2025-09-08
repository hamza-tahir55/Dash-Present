import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';

import { sanitizeFilename } from '@/app/(presentation-generator)/utils/others';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  const { id, title } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing Presentation ID" }, { status: 400 });
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-web-security',
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  page.setDefaultNavigationTimeout(300000);
  page.setDefaultTimeout(300000);

  await page.goto(`http://localhost:3000/pdf-maker?id=${id}`, { waitUntil: 'networkidle0', timeout: 300000 });

  await page.waitForFunction('() => document.readyState === "complete"')

  try {
    await page.waitForFunction(
      `
      () => {
        const allElements = document.querySelectorAll('*');
        let loadedElements = 0;
        let totalElements = allElements.length;
        
        for (let el of allElements) {
            const style = window.getComputedStyle(el);
            const isVisible = style.display !== 'none' && 
                            style.visibility !== 'hidden' && 
                            style.opacity !== '0';
            
            if (isVisible && el.offsetWidth > 0 && el.offsetHeight > 0) {
                loadedElements++;
            }
        }
        
        return (loadedElements / totalElements) >= 0.99;
      }
      `,
      { timeout: 300000 }
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

  } catch (error) {
    console.log("Warning: Some content may not have loaded completely:", error);
  }


  const pdfBuffer = await page.pdf({
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  browser.close();

  // Further sanitize the title to remove problematic characters like parentheses
  let sanitizedTitle = sanitizeFilename(title ?? 'presentation');
  // Replace parentheses and other special characters that might cause issues in URLs
  sanitizedTitle = sanitizedTitle.replace(/[\(\)\[\]\{\}\s]+/g, '_');
  
  // Use APP_DATA_DIRECTORY if defined, otherwise use a default path
  const appDataDir = process.env.APP_DATA_DIRECTORY || path.join(process.cwd(), 'user_data');
  const destinationPath = path.join(appDataDir, 'exports', `${sanitizedTitle}.pdf`);
  await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
  await fs.promises.writeFile(destinationPath, pdfBuffer);

  // Create a web-accessible URL path instead of a file system path
  // This path should be relative to the public directory and accessible via the web server
  const webAccessiblePath = `/user_data/exports/${sanitizedTitle}.pdf`;
  
  return NextResponse.json({
    success: true,
    path: webAccessiblePath
  });
}
