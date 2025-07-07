const express = require('express');
const productModel= require('../models/product');
const productRouter= express.Router();
const jwt= require('jsonwebtoken');

jwtKey= "Kaizoku_ou_ni_ore_wa_naru";

productRouter.post('/add-product', verifyToken, async(req, res)=>{
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

productRouter.get('/', verifyToken, async(req, res)=>{
    let allData= await productModel.find();
    res.json(allData);
})

productRouter.delete('/id/:id', verifyToken, async(req, res)=>{
    const result= await productModel.deleteOne({_id: req.params.id});
    res.json({message: 'Product deleted successfully'});
})

productRouter.get('/id/:id', verifyToken, async(req, res)=>{
    // console.log(req.params.id);
    const result= await productModel.findById(req.params.id);
    // console.log(result);
    return res.json(result);
})

productRouter.put('/id/:id', verifyToken, async(req, res)=>{
    const product= req.body;
    const result= await productModel.updateOne({_id: req.params.id}, {$set: product});
    // console.log(result);
    if(result.modifiedCount > 0){
        return res.json({message: 'Product updated successfully'});
    } else {
        return res.status(400).json({error: 'Failed to update product'});
    }
})

productRouter.get('/search/:key', verifyToken, async(req, res)=>{
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
    let token= req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        if(!token) {
            return res.status(403).json({error: 'Please provide a valid token'});
        }
        jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.status(401).json({error: 'unauthorized user access'});
            } else {
                // console.log(valid);
                next();
            }
        })
    }
    else {
        res.status(403).json({error: 'Please provide a token'});
    }
    // next();
}

module.exports = productRouter;