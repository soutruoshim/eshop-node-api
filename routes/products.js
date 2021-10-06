const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    //const productList = await Product.find();
    // const productList = await Product.find().populate('category');
    // if(!productList){
    //     res.status(500).json({success: false});
    // }
    // res.send(productList); 
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');
    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
} );

router.get(`/somefield`, async (req, res) => {
    //const productList = await Product.find().select('name');
    // const productList = await Product.find().select('name price image');
    const productList = await Product.find().select('name price image -_id');
    if(!productList){
        res.status(500).json({success: false});
    }
    res.send(productList); 
} );

router.get(`/:id`, async (req, res) => {
    //const product = await Product.findById(req.params.id);
    const product = await Product.findById(req.params.id).populate('category');
    if(!product){
        res.status(500).json({success: false});
    }
    res.send(product); 
} );


router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    
    
    product = await product.save();
    
   
    if(!product) return res.status(500).send('The product cannot be created')
    return res.send(product);

} );
router.put(`/:id`, async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
     }

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');

    const product = await Product.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        {new: true}
        );
    if(!product)
       return res.status(404).send("The category cannot be update");
    res.send(product);

} );

router.delete(`/:id`, (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({
                success: true,
                message: 'The product is deleted'
            })
        }else{
            return res.status(404).json({
                success: false,
                message: 'product not found'
            })
        }
    }).catch(err=>{
        return res.status(400).json({
            success: false,
            error: err
        })
    })
});

router.get(`/get/count`, async (req, res) =>{
    try{
        //const productCount = await Product.countDocuments((count)=> count)
        Product.countDocuments({},function(err, count){
            res.send({
                count: count
            });
        })
    }catch(ex){
        res.status(500).json({success: false, message: ex})
    }
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})



module.exports = router;