import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import AmbulanceModel from '../models/ambulanceModel.js';
import LocationModel from '../models/locationModel.js';

// CREATE Ambulance
const createAmbulanceController = asyncHandler(async(req, res) => {
  const {en: {basicInfo:{name}}, en, bn, common, publisher} = req.body;
  
  let enSlug = slugify(name).toLowerCase()
  let bnSlug = slugify(name).toLowerCase() + "-bn"

    const amblnceCreate = await AmbulanceModel.create({
      en, bn, common, publisher, enSlug, bnSlug
    })

    // push ambulance in location
    await LocationModel.updateOne({
      _id: amblnceCreate.location
    }, {
      $push: {
        ambulances: amblnceCreate._id
      }
    })
    
    if(amblnceCreate) {
      res.status(201).json({
        _id: amblnceCreate._id,
        en: amblnceCreate.en,
        bn: amblnceCreate.bn,
        common: amblnceCreate.common,
        // location: amblnceCreate.location,
        publisher: amblnceCreate.publisher,
        enSlug: slugify(req.body.en.basicInfo.name).toLowerCase(),
        bnSlug: slugify(req.body.en.basicInfo.name).toLowerCase() + "-bn",
      })
      
    } else {
      res.status(400).json({msg: "Ambulance created faield"})
    }

})

// EDIT Ambulance
const updateAmbulanceController = asyncHandler(async(req, res) => {
  try {
    const amb = await AmbulanceModel.findOne({slug: req.params.slug})

    if (amb) {
      const updateAmb = await AmbulanceModel.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateAmb)
    } else {
      res.status(401).json("Unauthorize Activity!");
    }
  } catch (error) {
    console.log(error)
    res.status(404)
      throw new Error('ambulance not found')
  }
})

// GET SINGLE Ambulance
const detailsAmbulanceController = asyncHandler(async(req, res) => {
    await AmbulanceModel.findOne({slug: req.params.slug})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data);
        });
})

// ALL Ambulance LIST
const allAmbulanceController = asyncHandler( async( req, res) => {
  const ambs = await AmbulanceModel.find({}).populate('publisher').sort({createdAt: 'desc'}).populate('location', 'name slug')
  if(ambs) {
    res.status(200).json(ambs)
  } else {
    res.status(404).json({msg: "No ambulance found!"})
  }
})

// DELETE Ambulance
const deleteAmbulanceController = asyncHandler(async(req, res) => {
  const amb = await AmbulanceModel.find({slug: req.params.id})
  if(!amb) {
    res.status(404)
    throw new Error("Ambulance not found")
  } else {
    const deletedAmb = await amb.remove()
    if(deletedAmb) {
      res.status(200).json({message: "Ambulance deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createAmbulanceController,
  deleteAmbulanceController,
  updateAmbulanceController,
  detailsAmbulanceController,
  allAmbulanceController
};

