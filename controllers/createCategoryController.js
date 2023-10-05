const Category = require("../models/categoryModel");
const slugify = require('slugify')


//create category
exports.createCategoryController = async(req,res) =>{
   try {
      const {name} = req.body;
      if(!name){
         return res.status(401).send({message:'name is required'});
      }
      
      const existingCategory = await Category.findOne({name});
      if(existingCategory){
         return res.status(200).send({
            success:true,
            message:"Category Already Exisits",

         })
      }

      const category = await new Category({name,slug:slugify(name)}).save();
      res.status(201).send({
         success:true,
         message:'new category created',
         category
      })


   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:'Error in Category',
      }) 
   }
}











//update category
exports.updateCategoryController = async(req,res)=>{
   try {
      const {name} = req.body;
      const {id} = req.params;
      const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
      res.status(200).send({
         success:true,
         message:"Category Updated Successfully",
         category,
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error While updating category"
      })
      
   }

}


//get all category
exports.categoryController = async(req,res)=>{
   try {
      const category = await Category.find({})
      res.status(200).send({
         success:true,
         message:"All Category List",
         category,
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error While getting all categroies"
      })
      
   }


}




//single Category
exports.singleCategoryController = async(req,res)=>{
   try {
      // const {slug} = req.params;
      const category = await Category.findOne({slug:req.params.slug})
      res.status(200).send({
         success:true,
         message:"Get Single Category Successfully",
         category,
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error While getting Single category"
      })
      
   }

}


//delete Category
exports.deleterCatergoryController = async(req,res)=>{
   try {
      const {id} = req.params;
      await Category.findByIdAndDelete(id)
      res.status(200).send({
         success:true,
         message:"Category Deleted Successfully",
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error While deleting  category"
      })
      
   }

}






