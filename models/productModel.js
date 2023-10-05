const mongoose = require('mongoose');
const Category = require('./categoryModel');

const productSchema = new mongoose.Schema({
   name:{
      type:String,
      require:true,
   },
   slug:{
      type:String,
      require:true,
   },
   description:{
      type:String,
      require:true,
   },
   price:{
      type:String,
      require:true,
   },
   category:{
      type:mongoose.ObjectId,
      ref:Category,
      required:true,
   },
   quantity:{
      type:Number,
      required:true,
   },
   photo:{
      data:Buffer,
      contentType:String,
   },
   shipping:{
      type:Boolean,
   },
},{timeseries:true})





const Product = mongoose.model("product",productSchema)

module.exports = Product;







