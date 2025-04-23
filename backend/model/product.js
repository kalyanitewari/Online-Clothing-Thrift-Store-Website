const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
    trim: true,
  },
  clothType: { // Changed from category
    type: String,
    required: [true, "Please enter the type of cloth!"],
  },
  tags: {
    type: String,
    trim: true,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],

  // --- REMOVED FIELDS ---
  // reviews: [],
  // ratings: Number,
  // originalPrice: Number,
  // stock: Number,
  // category: String,
  // style: String,
  // era: String,

  // --- NEW FIELDS FOR CLOTHING THRIFT SHOP ---
  condition: {
    type: String,
    enum: ['New with tags', 'Excellent', 'Very Good', 'Good', 'Fair'],
    required: [true, "Please select the condition of the item"],
    default: 'Good',
  },
  brand: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
    required: [true, "Please enter the size of the item"],
  },
  material: {
    type: String,
    trim: true,
    required: [true, "Please enter the material of the item"],
  },
  flaws: {
    type: String,
    trim: true,
    required: [true, "Please describe any flaws or imperfections"],
  },

  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);