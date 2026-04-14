import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initializeDatabase, runHealthCheck } from './services/databaseService.js';
import authRoutes from './routes/authRoutes.js';
import binRoutes from './routes/binRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser clients (no Origin header)
    if (!origin) return callback(null, true);

    // Allow explicit list + any localhost port (dev)
    if (allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, origin);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', async (req, res) => {
  try {
    const dbHealth = await runHealthCheck();
    res.json({ 
      server: 'OK', 
      timestamp: new Date().toISOString(),
      database: dbHealth
    });
  } catch (error) {
    res.status(500).json({ 
      server: 'OK', 
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/database/init', async (req, res) => {
  try {
    const initResult = await initializeDatabase();
    res.json(initResult);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});