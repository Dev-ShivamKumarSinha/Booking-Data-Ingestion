import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Connect to mongoDb first then start the server
connectDB().then(()=>{
    //Routes
    app.use('/bookings', bookingRoutes);

    //Health check
    app.get('/', (req,res)=>{
        res.status(200).json({
            message: "Booking Data Ingestion Service is Running"
        });
    })

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((err)=>{
    console.log("Failed to connect to MongoDb:",err)
    process.exit(1);
})
