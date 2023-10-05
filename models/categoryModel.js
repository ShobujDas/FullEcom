const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name:{
      type:String,
      required:true,
      unique:true,

   },
   slug:{
      type:String,
      lowercase:true,
   }
},{timeseries:true});

const Category = mongoose.model('cateries',categorySchema);

module.exports = Category;






















