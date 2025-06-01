const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

function dbConnect() {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to DB....");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = dbConnect;
