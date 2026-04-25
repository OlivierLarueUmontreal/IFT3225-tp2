import express, {json} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import connectDB from './db/connect.js';

import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

// Initialize app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(json()); // Parses incoming JSON requests
app.use(cookieParser(process.env.JWT_SECRET)); // Parses incoming cookies

// Swagger Configuration
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('./swagger_output.json', import.meta.url)));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('<h1>API is running</h1><a href="/api-docs">Documentation</a>');
});

import {profileRoute} from './routes/profileRoute.js'
import {mdpRoute} from './routes/mdpRoute.js'
import {authRoute} from './routes/authRoute.js';
import {docRoute} from "./routes/docRoute.js";


import errorHandlerMiddleware from './middleware/error-handler.js';

app.use('/health', (req, res, next) => {
    res.json({message: 'Server is alive'});
    next();
})

app.use('/api/v1/profils', profileRoute)
app.use('/api/v1/motdepasse', mdpRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/doc', docRoute)


// disable middleware for easy debugging
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 6767;

const start = async () => {
    try {
        await connectDB(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?appName=${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        app.listen(
            PORT, () => {
                console.log(`Server listening on port ${PORT}`)
            }
        )
    } catch (error) {
        console.log(error)
    }
}

start()