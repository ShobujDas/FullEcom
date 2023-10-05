const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleterCatergoryController } = require('../controllers/createCategoryController');


const router = express.Router();


//routes
//Create category
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getAll catgegory
router.get("/get-category",categoryController)

//single category
router.get("/single-category/:slug",singleCategoryController);

//delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleterCatergoryController)

module.exports = router;



























