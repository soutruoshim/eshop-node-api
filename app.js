const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv/config');

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log("Database connection success!");
})
.catch((err)=>{
    console.log(err);
});

app.listen(3000, () => {
    console.log(api);
    console.log("Server is running now http://localhost:3000");
});