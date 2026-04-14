import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import {config} from "./config/config.js";

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
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/user/google/callback'

},(_,__,profile,done)=>{
    return done(null,profile);
}))


app.use('/api/user', authRoutes)
app.use('/api/product', productRoutes)



export default app