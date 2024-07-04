// pages/api/captureScreenshot.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import screenshotDesktop from 'screenshot-desktop';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await screenshotDesktop();
    const timestamp = Date.now();
    const filePath = path.join(process.cwd(), 'public', `screenshot-${timestamp}.jpg`);
    fs.writeFileSync(filePath, data);
    res.status(200).json({ message: 'Screenshot taken', filePath: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to capture screenshot.' });
  }
}
