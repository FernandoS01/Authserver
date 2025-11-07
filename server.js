import express from 'express';
import cors from 'cors';
import router from './Routers/routers.js';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`)
});

