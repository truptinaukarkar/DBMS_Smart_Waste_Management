import supabase from '../config/supabaseClient.js';
import { createTask } from '../services/taskService.js';

router.post('/task', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;

    const fileName = `bin_${Date.now()}_${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from('waste-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('waste-images')
      .getPublicUrl(fileName);

    const photo_url = urlData.publicUrl;

    const task = await createTask(
      req.body.bin_id,
      req.body.user_id,
      req.body.fill_level,
      photo_url
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});