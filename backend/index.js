const express =  require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/products.route")
const userRoute = require("./routes/users.route")
const errorMiddleware = require("./middlewares/error")
require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());    
//routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.use(errorMiddleware);


// DB connection
mongoose.set("strictQuery", false);

mongoose.connect(DB_URL)
.then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
        console.log(`Server Nodejs API running on port ${PORT}`)
    })
}).catch((error) =>{
    console.log(error)
})
