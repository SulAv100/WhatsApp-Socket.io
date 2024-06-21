require("dotenv").config();
const express = require("express");
const cors = require("cors");



const app = express();
app.use(cors());
// app.get('/').send("This is the homepage");

app.get('/', (req,res)=>{
    res.status(200).send("This is homepage");
})

const URL = process.env.URI || 3000;

app.listen(URL, (req,res)=>{
    console.log("The server is running right now");
})
