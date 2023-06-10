import { response } from "express";
import expressAsyncHandler from "express-async-handler"
import menuModel from '../models/menuModel.js'

const createMenu = expressAsyncHandler( async(req, res) => {
  
  const {primaryMenu, sidebarMenu, footerMenu, mobileMenu} = req.body;

  const createMenu = await menuModel.create({primaryMenu, sidebarMenu, footerMenu, mobileMenu})

  if(createMenu) {
    res.status(200).json({
      _id: createMenu._id,
      primaryMenu: createMenu.primaryMenu,
      sidebarMenu: createMenu.sidebarMenu,
      mobileMenu: createMenu.mobileMenu,
      footerMenu: createMenu.footerMenu,
    })
  } else {
    req.status(400).json("Menu create faild")
  }
})

const menuList = expressAsyncHandler( async (req, res) => {
  const menu = await menuModel.find({}).populate('primaryMenu')
  if(menu) {
    res.status(200).json(menu)
  } else {
    res.status(400).json('Menu not found')
  }
})

export {createMenu, menuList}