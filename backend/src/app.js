import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();


app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api/user', authRoutes)



export default app