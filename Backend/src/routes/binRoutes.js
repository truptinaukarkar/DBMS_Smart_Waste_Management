import express from 'express';
import { 
  createBin, 
  getAllBins, 
  getBinById, 
  updateBinStatus, 
  deleteBin, 
  getBinsByStatus 
} from '../services/binService.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { location, latitude, longitude, capacity } = req.body;

    if (!location || latitude === undefined || longitude === undefined || !capacity) {
      return res.status(400).json({ 
        error: 'Location, latitude, longitude, and capacity are required' 
      });
    }

    if (capacity <= 0) {
      return res.status(400).json({ error: 'Capacity must be a positive number' });
    }

    const bin = await createBin(location, latitude, longitude, capacity);
    res.status(201).json({
      message: 'Bin created successfully',
      bin
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let bins;

    if (status) {
      bins = await getBinsByStatus(status);
    } else {
      bins = await getAllBins();
    }

    res.json(bins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bin = await getBinById(req.params.id);
    res.json(bin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:id/status', authenticateToken, authorizeRole(['admin', 'worker']), async (req, res) => {
  try {
    const { status, current_fill } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['active', 'inactive', 'maintenance', 'full'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be one of: ' + validStatuses.join(', ') 
      });
    }

    const bin = await updateBinStatus(req.params.id, status, current_fill);
    res.json({
      message: 'Bin status updated successfully',
      bin
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    await deleteBin(req.params.id);
    res.json({ message: 'Bin deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
