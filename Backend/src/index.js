import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use('/api', taskRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});