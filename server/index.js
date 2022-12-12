import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js'


const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
mongoose.set('strictQuery', false);
app.use(cors());

app.use('/users', userRoutes)


app.get('/', (req, res) => {
    res.send("hello world");
})


mongoose.connect((process.env.CONNECTION_URL))
 .then(() => app.listen(PORT, () => console.log("server running on port: 5000")))
 .catch((error) => console.log(error.message));


