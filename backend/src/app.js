import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';


const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/user', authRoutes)


export default app