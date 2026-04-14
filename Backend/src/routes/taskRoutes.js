import express from 'express';
import supabase from '../config/supabaseClient.js';
import upload from '../middleware/upload.js';
import { createTask } from '../services/taskService.js';

const router = express.Router();

router.post('/task', upload.single('photo'), async (req, res) => {
  try {
    const { bin_id, user_id, fill_level } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    const fileName = `bin_${Date.now()}_${file.originalname}`;

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

    const photo_url = urlData.publicUrl;

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

export default router;