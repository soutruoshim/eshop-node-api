const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const mongoose = require("mongoose");

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');
const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "Potato",
        image: "some url"
    }
   res.send(product);
} );

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
} );

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