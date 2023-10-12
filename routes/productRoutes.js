const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createProductController, getProductsController, getSingleproducsController, productPhotoController, deleteProductController, updateProductController, productFiltersController,productCountController, productListController, searchProductController, realtedProductController, productCategoryController } = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();


//routes
//create Product
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)



//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)




//get Products
router.get("/get-product",getProductsController)





//single Products
router.get("/get-product/:slug",getSingleproducsController)






//get photo 
router.get("/product-photo/:pid",productPhotoController)





//delete product
router.delete("/delete-product/:pid",deleteProductController)






//filter product
router.post("/product-filters",productFiltersController)


//Product conunt
router.get("/product-count",productCountController);

//Product per page
router.get('/product-list/:page',productListController)




//Search Product
router.get("/search/:keyword",searchProductController)

//Similar Product
router.get("/related-product/:pid/:cid",realtedProductController)



//category wise product
router.get("/product-category/:slug",productCategoryController)



module.exports = router;
