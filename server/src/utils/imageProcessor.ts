import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import gifFrames from 'gif-frames';

export async function generateThumbnail(
  inputPath: string,
  outputPath: string
): Promise<void> {
  // Ensure the output directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  // Extract first frame of the GIF
  const frameData = await gifFrames({
    url: inputPath,
    frames: 0,
    outputType: 'png',
  });

  // Process the frame with sharp
  await sharp(frameData[0].getImage())
    .resize(300, 300, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
}