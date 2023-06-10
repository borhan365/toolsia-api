import asyncHandler from 'express-async-handler';
import OxygenModel from '../models/oxygenModel.js';
import slugify from 'slugify'

// CREATE Oxygen
const createOxygenController = asyncHandler(async(req, res) => {
  const {name, email, website, address, video, numberOne, numberTwo, excerpt, description, extraMessage, logo, postStatus, location, publisher} = req.body;
  
  let slug = slugify(name).toLowerCase()

    const oxygenCreate = await OxygenModel.create({
      name, slug, email, website, video, address, numberOne, numberTwo, excerpt, description, extraMessage, logo, postStatus, location, publisher
    })
    
    if(oxygenCreate) {
      res.status(201).json({
        _id: oxygenCreate._id,
        name: oxygenCreate.name,
        slug: slugify(name).toLowerCase(),
        email: oxygenCreate.email,
        website: oxygenCreate.website,
        video: oxygenCreate.video,
        address: oxygenCreate.address,
        numberOne: oxygenCreate.numberOne,
        numberTwo: oxygenCreate.numberTwo,
        excerpt: oxygenCreate.excerpt,
        description: oxygenCreate.description,
        extraMessage: oxygenCreate.extraMessage,
        logo: oxygenCreate.logo,
        postStatus: oxygenCreate.postStatus,
        location: oxygenCreate.location,
        publisher: oxygenCreate.publisher,
      })
      
    } else {
      res.status(400).json({msg: "Ambulance created faield"})
    }

})

// EDIT Oxygen
const updateOxygenController = asyncHandler(async(req, res) => {
  try {
    const amb = await OxygenModel.findOne({slug: req.params.slug})

    if (amb) {
      const updateAmb = await OxygenModel.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateAmb)
    } else {
      res.status(401).json("Unauthorize Activity!");
    }
  } catch (error) {
    console.log(error)
    res.status(404)
      throw new Error('Oxygen not found')
  }
})

// GET SINGLE Oxygen
const detailsOxygenController = asyncHandler(async(req, res) => {
    await OxygenModel.findOne({slug: req.params.slug})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data);
        });
})

// ALL Oxygen LIST
const allOxygenController = asyncHandler( async( req, res) => {
  const ambs = await OxygenModel.find({}).populate('publisher', 'name slug').sort({createdAt: 'desc'}).populate('location', 'name slug')
  if(ambs) {
    res.status(200).json(ambs)
  } else {
    res.status(404).json({msg: "No Oxygen Found!"})
  }
})

// DELETE Ambulance
const deleteOxygenController = asyncHandler(async(req, res) => {
  const amb = await OxygenModel.findOne(req.params.id)
  if(!amb) {
    res.status(404)
    throw new Error("Oxygen not found")
  } else {
    const deletedAmb = await amb.remove()
    if(deletedAmb) {
      res.status(200).json({message: "Oxygen deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createOxygenController,
  deleteOxygenController,
  updateOxygenController,
  detailsOxygenController,
  allOxygenController
};
