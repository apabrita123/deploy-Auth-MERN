const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const route = require("./routes/route");
app.use(cors());
app.use(express.json());

dbConnect();

app.get("/home", (req, res) => {
  res.send("Welcome to home");
});

app.use("/auth", route);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}...`);
});
