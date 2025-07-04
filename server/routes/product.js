const express = require('express');
const productModel= require('../models/product');
const productRouter= express.Router();

productRouter.post('/add-product', async(req, res)=>{
    let product= req.body;
    let preCase= await productModel.findOne({name: product.name});
    if(preCase){
        return res.status(400).json({error: 'Product already exists'});
    }
    let result= await productModel.create(product);
    // const res2= await result.populate('userId');
    // console.log(res2);
    res.json({message: 'Product added successfully'});
})

productRouter.get('/', async(req, res)=>{
    let allData= await productModel.find();
    res.json(allData);
})

productRouter.delete('/id/:id', async(req, res)=>{
    const result= await productModel.deleteOne({_id: req.params.id});
    res.json({message: 'Product deleted successfully'});
})

productRouter.get('/id/:id', async(req, res)=>{
    // console.log(req.params.id);
    const result= await productModel.findById(req.params.id);
    // console.log(result);
    return res.json(result);
})

productRouter.put('/id/:id', async(req, res)=>{
    const product= req.body;
    const result= await productModel.updateOne({_id: req.params.id}, {$set: product});
    // console.log(result);
    if(result.modifiedCount > 0){
        return res.json({message: 'Product updated successfully'});
    } else {
        return res.status(400).json({error: 'Failed to update product'});
    }
})

productRouter.get('/search/:key', async(req, res)=>{
    // console.log(req.params.key);
    let result= await productModel.find({
        "$or": [
            {name: {$regex: req.params.key, $options: 'i'}}, //case sensitive
            {company: {$regex: req.params.key, $options: 'i'}},
            {category: {$regex: req.params.key, $options: 'i'}}
        ]
    });
    // console.log(result);
    res.json(result);
})

function verifyToken(req, res, next){
    
}

module.exports = productRouter;