import screenshotDesktop from 'screenshot-desktop';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';

// Function to capture and save a screenshot
const captureScreenshot = async () => {
  try {
    const data = await screenshotDesktop();
    const timestamp = Date.now();
    const filePath = path.join(process.cwd(), 'public', `screenshot-${timestamp}.jpg`);
    fs.writeFileSync(filePath, data);
    console.log(`Screenshot taken and saved: ${filePath}`);
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
  }
};

// Schedule cron job to run every hour (adjust cron schedule as needed)
cron.schedule('0 * * * *', () => {
  captureScreenshot();
});
