//pakages:

import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


//utiles

import connectDB from './config/db.js';
import userRoutes from '../Backend/routes/userRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();




const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.listen(port,() => console.log(`server runing on port: ${port}`));

app.use("/api/users" , userRoutes);