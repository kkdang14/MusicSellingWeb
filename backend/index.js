const express =  require("express");
const cors = require("cors");
const app = express();
const dbConnection = require("./utils/db")
const productRoute = require("./routes/products.route")
const userRoute = require("./routes/users.route")
const errorMiddleware = require("./middlewares/error")
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

//routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.use(errorMiddleware);

dbConnection.connect();

app.listen(PORT, () => {
    console.log(`Server Node.js API running on port ${PORT}`);
});
