import asynHandler from 'express-async-handler'
import LogoModel from '../models/logosModel.js'

// Create
const createLogo = asynHandler(async (req, res) => {
  const {headerLogo, sidebarLogo, mobileLogo, footerLogo} = req.body;

  const createLogo = await LogoModel.create({headerLogo, sidebarLogo, mobileLogo, footerLogo})

  if(createLogo) {
    res.status(201).json({
      _id: createLogo._id,
      headerLogo: createLogo.headerLogo,
      sidebarLogo: createLogo.sidebarLogo,
      mobileLogo: createLogo.mobileLogo,
      footerLogo: createLogo.footerLogo,
    })
    
  } else {
    res.status(400).json({msg: "Logo created faield"})
  }
})

// get single logo
const getLogos = asynHandler(async (req, res) => {
  const logo = await LogoModel.findById(req.params.id)
  if(logo) {
    res.status(200).json(logo)
  } else {
    res.status(400).json("Sorry! Logo not found!")
  }
})

// EDIT logo
const editLogo = asynHandler(async(req, res) => {
    const logo = await LogoModel.findById(req.params.id)

    if (logo) {
      const updateLogo = await LogoModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateLogo)
    } else {
      res.status(401).json("You can update only your post!");
    }
})


// list of the logo
const logoList = asynHandler( async(req, res) => {
  const logo = await LogoModel.find({})
  if(logo) {
    res.status(200).json(logo)
  } else {
    res.status(400).json("Logo list success")
  }
})

export {createLogo, getLogos, logoList, editLogo};