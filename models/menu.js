const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      enum:['breakfast','lunch','dinner']

    }
  ],
  tags: [
    {
      type: String,
      enum:['veg', 'nonveg']
    }
  ],
  size: [
    {
      type: {
        type: String,
        enum: ['small', 'medium', 'large'],        
      },
      price: {
        type: Number,
        required: false,
      },
      qty: {
        type: Number,
        required: false,
      },
    }
  ],
  dishImage: [
    {
      type: String,
    }
  ],
  dishImageGallery: [
    {
      type: String,
    }
  ],
});
module.exports = mongoose.model("menu", menuSchema);
