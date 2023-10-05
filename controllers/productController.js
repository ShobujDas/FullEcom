const slugify = require("slugify");

const Product = require("../models/productModel");
const fs = require("fs");

exports.createProductController = async (req, res) => {
  try {
    const { name, description, price, slug, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Require" });
      case !description:
        return res.status(500).send({ error: "Description is Require" });
      case !price:
        return res.status(500).send({ error: "Price is Require" });
      case !category:
        return res.status(500).send({ error: "Category is Require" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Require" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then 1mb " });
    }

    const products = await new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(200).send({
      success: true,
      message: "product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Createing Products",
    });
  }
};

//get All Products
exports.getProductsController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      total_count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in getting Products",
    });
  }
};

//get single products
exports.getSingleproducsController = async (req, res) => {
  try {
    // const {slug} = req.params
    const products = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Products Fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in getting Single Products",
    });
  }
};

//get photo
exports.productPhotoController = async (req, res) => {
  try {
    // const {slug} = req.params
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(200).send({
      success: true,
      message: "photo Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting photo",
    });
  }
};

//delete Product controller
exports.deleteProductController = async (req, res) => {
  try {
    // const {slug} = req.params
    const product = await Product.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while deleting Product",
    });
  }
};

//update producta
exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//filter product
exports.productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    // if(radio.length ) args.price  = {$gte:radio[0], $lte:radio[1]}
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error White Filtering Products",
      error,
    });
  }
};

// product count

exports.productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while products count ",
      error,
    });
  }
};

//Product list base on page
exports.productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while products count ",
      error,
    });
  }
};






//search Product
exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({ 
      $or: [
        {name:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}},
      ]
    }).select("-photo");
    res.json(results)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search Product API",
      error,
    });
  }
};




