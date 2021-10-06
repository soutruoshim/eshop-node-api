const mongoose = require("mongoose");

//product schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }

});
// product model
exports.Product = mongoose.model('Product', productSchema);
