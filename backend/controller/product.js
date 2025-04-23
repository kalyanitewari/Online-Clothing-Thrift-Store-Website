const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        if (!files || files.length < 3) {
          // Ensure at least 3 images are uploaded
          files.forEach((file) => {
            fs.unlinkSync(file.path); // Delete uploaded files if less than 3
          });
          return next(new ErrorHandler("Please upload at least 3 images!", 400));
        }
        const imageUrls = files.map((file) => `${file.filename}`);

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        // Include the new fields from the request body
        const { clothType, condition, brand, size, material, flaws, discountPrice, name, description, tags } = req.body;

        if (!clothType) {
          return next(new ErrorHandler("Type of cloth is required!", 400));
        }
        if (!condition) {
          return next(new ErrorHandler("Condition is required!", 400));
        }
        if (!size) {
          return next(new ErrorHandler("Size is required!", 400));
        }
        if (!material) {
          return next(new ErrorHandler("Material is required!", 400));
        }
        if (!flaws) {
          return next(new ErrorHandler("Flaws description is required!", 400));
        }
        if (!discountPrice) {
          return next(new ErrorHandler("Discount price is required!", 400));
        }
        if (!name) {
          return next(new ErrorHandler("Product name is required!", 400));
        }
        if (!description) {
          return next(new ErrorHandler("Product description is required!", 400));
        }

        productData.clothType = clothType; // Instead of category
        productData.condition = condition;
        productData.brand = brand || ""; // Optional, default to empty string if not provided
        productData.size = size;
        productData.material = material;
        productData.flaws = flaws;
        productData.discountPrice = discountPrice;
        productData.name = name;
        productData.description = description;
        productData.tags = tags || ""; // Optional, default to empty string if not provided

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      // Clean up uploaded files in case of an error
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      }
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;