import chokidar from 'chokidar';
import path from 'path';
import { promises as fs } from 'fs';
import { generateThumbnail } from './imageProcessor';
import { db } from './db';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const TV_DIR = path.join(CONTENT_DIR, 'tv');
const MOVIES_DIR = path.join(CONTENT_DIR, 'movies');

// Ensure directories exist
async function initDirectories() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(TV_DIR, { recursive: true });
  await fs.mkdir(MOVIES_DIR, { recursive: true });
}

export function initializeFileWatcher() {
  initDirectories();

  const watcher = chokidar.watch([TV_DIR, MOVIES_DIR], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: false,
  });

  watcher
    .on('add', async (filePath) => {
      if (!filePath.toLowerCase().endsWith('.gif')) return;

      const category = filePath.includes('/tv/') ? 'tv' : 'movie';
      const filename = path.basename(filePath);
      const previewPath = path.join(
        CONTENT_DIR,
        'previews',
        `${path.basename(filePath, '.gif')}_preview.jpg`
      );

      try {
        await generateThumbnail(filePath, previewPath);
        
        await db.gif.create({
          data: {
            filename,
            path: filePath,
            previewPath,
            category,
            dateAdded: new Date(),
          },
        });

        console.log(`Added new GIF: ${filename}`);
      } catch (error) {
        console.error(`Error processing ${filename}:`, error);
      }
    })
    .on('unlink', async (filePath) => {
      if (!filePath.toLowerCase().endsWith('.gif')) return;
      
      try {
        await db.gif.deleteMany({
          where: { path: filePath },
        });
        console.log(`Removed GIF: ${path.basename(filePath)}`);
      } catch (error) {
        console.error(`Error removing ${filePath}:`, error);
      }
    });

  return watcher;
}