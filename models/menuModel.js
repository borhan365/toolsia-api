import mongoose from "mongoose";

const menuModel = mongoose.Schema(
  {
    primaryMenu: [{
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }],
  },
  {
    sidebarMenu: [{
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }],
  },
  {
    mobileMenu: [{
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }],
  },
  {
    footerMenu: [{
      type: mongoose.Types.ObjectId,
      ref: "Category"
    }],
  },
  {timestamps: true},
)

const Menu = mongoose.model('Menu', menuModel)

export default Menu