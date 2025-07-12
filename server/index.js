import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import mentorRoutes from './routes/mentorRoutes.js';

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: ['http://localhost:5173', ],
  credentials: true
}))
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/mentor', mentorRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('✅ API is running')
})

app.get('/info', (req, res) => {
    res.json({
        "name": "naveen",
        "age": 20
    })
})

app.get('/api/protected', protect, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});


app.listen(port, () => {
  console.log(`🚀 Server is running at http//localhost: ${port}`)
})