import express from 'express';
import { db } from '../utils/db';
import path from 'path';
import multer from 'multer';
import { promises as fs } from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const category = req.body.category || 'tv';
    const dir = path.join(process.cwd(), 'content', category);
    await fs.mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/gif') {
      cb(new Error('Only GIF files are allowed'));
      return;
    }
    cb(null, true);
  },
});

// Get all GIFs
router.get('/', async (req, res) => {
  const category = req.query.category as string;
  const gifs = await db.gif.findMany({
    where: category && category !== 'all' ? { category } : undefined,
    orderBy: { dateAdded: 'desc' },
  });

  res.json(gifs.map(gif => ({
    ...gif,
    url: `/content/${gif.category}/${path.basename(gif.path)}`,
    previewUrl: `/content/previews/${path.basename(gif.previewPath)}`,
  })));
});

// Upload new GIF
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const category = req.body.category || 'tv';
  const filename = req.file.filename;
  const filePath = req.file.path;

  try {
    const gif = await db.gif.create({
      data: {
        filename,
        path: filePath,
        previewPath: `${path.basename(filePath, '.gif')}_preview.jpg`,
        category,
        dateAdded: new Date(),
      },
    });

    res.json({
      ...gif,
      url: `/content/${category}/${filename}`,
      previewUrl: `/content/previews/${path.basename(gif.previewPath)}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

export default router;