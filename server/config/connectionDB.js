const mongoose = require('mongoose');


const connectMongo=async (url)=>{
    await mongoose.connect(url).then(()=> console.log('mongoDB connected'));
}

module.exports= connectMongo