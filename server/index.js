import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import { dbConnect } from './config/dbConfig.js';
import userRouter from './routes/UserRoutes.js';

dotenv.config();

const port = process.env.PORT || 8081;

const app = express();
app.use(express.json());

//Console out the incomming requests
app.use(morgan('dev'));
app.use(cors());

//Initial Respond
app.get('/', (req, res) => {
    res.send('Server is running');
});

//Routes
app.use('/', userRouter);

//Create Server
dbConnect().then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening on port  ${port}`);
    })
})
