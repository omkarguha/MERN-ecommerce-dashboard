const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv').config();
const cors= require('cors');

const connectMongo= require('./config/connectionDB');

const userRouter= require('./routes/user');
const productRouter= require('./routes/product');

//Main Route Instance
const app= express();

//connection with Database
connectMongo(process.env.Mongo_URL);

//middlewares
app.use(express.json());
app.use(cors());


app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(5000, ()=> console.log('server started'));