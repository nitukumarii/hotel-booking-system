const express = require("express");
const dotenv = require("dotenv");
var path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
})

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/v1/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
