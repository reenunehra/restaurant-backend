const express = require("express");
const mongoose = require("mongoose");

const menuRoutes = require("./routes/menu");


const app = express();
const cors = require('cors');



const port = 3000;

mongoose.connect("mongodb://localhost:27017/restaurant", {
  useNewUrlParser: true,
});
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1',menuRoutes);


app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`);
});
