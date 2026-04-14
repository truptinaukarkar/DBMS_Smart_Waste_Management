import express from 'express';
import supabase, { isDemoSupabase } from '../config/supabaseClient.js';
import upload from '../middlewares/upload.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { 
  createTask, 
  getTasksByBin, 
  getTasksByUser, 
  getAllTasks 
} from '../services/taskService.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { bin_id, fill_level } = req.body;
    const file = req.file;
    const user_id = req.user.userId;

    if (!file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    if (!bin_id || fill_level === undefined) {
      return res.status(400).json({ error: 'Bin ID and fill level are required' });
    }

    const fileName = `bin_${Date.now()}_${file.originalname}`;

    let photo_url = '';
    if (isDemoSupabase) {
      const uploadsDir = path.resolve(process.cwd(), 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const outPath = path.join(uploadsDir, safeName);
      await fs.writeFile(outPath, file.buffer);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      photo_url = `${baseUrl}/uploads/${encodeURIComponent(safeName)}`;
    } else {
      const { error: uploadError } = await supabase.storage
        .from('waste-images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      const { data: urlData } = supabase.storage
        .from('waste-images')
        .getPublicUrl(fileName);

      photo_url = urlData.publicUrl;
    }

    const task = await createTask(
      bin_id,
      user_id,
      fill_level,
      photo_url
    );

    res.status(201).json({
      message: 'Task created successfully',
      task,
      photo_url
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticateToken, authorizeRole(['admin', 'worker']), async (req, res) => {
  try {
    const { bin_id, user_id } = req.query;
    let tasks;

    if (bin_id) {
      tasks = await getTasksByBin(bin_id);
    } else if (user_id) {
      tasks = await getTasksByUser(user_id);
    } else {
      tasks = await getAllTasks();
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bin/:bin_id', async (req, res) => {
  try {
    const tasks = await getTasksByBin(req.params.bin_id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;