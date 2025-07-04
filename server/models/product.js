const {Schema, model}= require('mongoose');

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    company:{
        type: String,
        required: true
    }
})

const productModel= model('product', productSchema);
module.exports = productModel;