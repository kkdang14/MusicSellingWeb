const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});

module.exports = mongoose; 
