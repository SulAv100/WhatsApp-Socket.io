require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db.js");
const router = require("./routes/courseroute.js")



const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// app.get('/').send("This is the homepage");

app.get('/', (req,res)=>{
    res.status(200).send("This is homepage");
})

app.use('/api/auth',router);

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
  
  
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
  