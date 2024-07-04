// C:\Users\Jassem\Desktop\dev\screenshot\app\components\CaptureTrigger.tsx
"use client";
import { useState, useEffect } from 'react';
import { debounce } from 'lodash'; // Import debounce from lodash library

let intervalId: ReturnType<typeof setInterval> | null = null;

const CaptureTrigger = () => {
  const [screenshotPath, setScreenshotPath] = useState<string>('');
  const [captureCount, setCaptureCount] = useState<number>(0); // State to track capture count
  const [isCapturing, setIsCapturing] = useState<boolean>(false); // State to track capturing state

  const debouncedSetCaptureCount = debounce((newCount: number) => {
    console.log(`Capture ${newCount} has been taken`);
  }, 100); // Debounce for 100 milliseconds
  
  const captureScreenshot = async () => {
    try {
      const res = await fetch('/api/capture/route');
      const data = await res.json();
      if (data.filePath) {
        setScreenshotPath(data.filePath);
        setCaptureCount((prevCount) => {
          const newCount = prevCount + 1;
          debouncedSetCaptureCount(newCount); // Use debounced function
          return newCount;
        });
      } else {
        console.error('Failed to capture screenshot');
      }
    } catch (error) {
      console.error('Failed to fetch screenshot:', error);
    }
  };

  const startCapturing = () => {
    setIsCapturing(true);
  };

  const stopCapturing = () => {
    setIsCapturing(false);
  };

  useEffect(() => {
    if (isCapturing) {
      captureScreenshot(); // Initial capture on start
      intervalId = setInterval(captureScreenshot, 3000); // Start capturing every 5 seconds
    } else {
      intervalId && clearInterval(intervalId); // Clear interval on stop
    }

    // Cleanup function to clear the interval when the component unmounts or capturing stops
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; // Reset intervalId to null after clearing
      }
    };
  }, [isCapturing]); // Effect runs when isCapturing state changes

  return (
    <div>
      {!isCapturing ? (
        <button onClick={startCapturing}>Start Automatic Captures</button>
      ) : (
        <button onClick={stopCapturing}>Stop Automatic Captures</button>
      )}
    
    </div>
  );
};

export default CaptureTrigger;
