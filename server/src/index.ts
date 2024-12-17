import express from 'express';
import cors from 'cors';
import path from 'path';
import gifsRouter from './routes/gifs';
import { initializeFileWatcher } from './utils/fileWatcher';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/content', express.static(path.join(process.cwd(), 'content')));

// API routes
app.use('/api/gifs', gifsRouter);

// Initialize file watcher
initializeFileWatcher();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});