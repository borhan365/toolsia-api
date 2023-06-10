import expressAsyncHandler from 'express-async-handler';
import FeatureModel from '../models/hospitalFeaturesModel.js';
import slugify from 'slugify'

// Create 
const createFeature = expressAsyncHandler( async(req, res) => {
  const { enName, bnName } = req.body;
  const slug = slugify(enName).toLowerCase()

  const Feature = await FeatureModel.create({enName, bnName, slug})
  
  if(Feature) {
    res.status(201).json({
      _id: Feature.id,
      enName: Feature.enName,
      bnName: Feature.bnName,
      slug: slugify(req.body.enName).toLowerCase(),
    })
  } else {
    res.status(400).json({message: "Feature create failed"})
  }
})

// Edit Feature
const editFeature = expressAsyncHandler( async (req, res) => {
  const Feature = await FeatureModel.findById(req.params.id)
  
  if(Feature) {
    const updatedSpecial = await FeatureModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "Feature update error"})
  }
})


// Get single Features
const getSingleFeature = expressAsyncHandler(async(req, res) => {
  const Feature = await FeatureModel.findById(req.params.id)
  if(Feature) {
    res.status(200).json(Feature)
  } else {
    res.status(404)
    throw new Error("Feature not found")
  }
})

// Get all Features
const getAllFeatures = expressAsyncHandler(async(req, res) => {
  const Features = await FeatureModel.find({}).sort({createdAt: 'desc'})
  if(Features) {
    res.status(200).json(Features)
  } else {
    res.status(404).json({message: "All Features not found"})
  }
})

// Delete Feature
const deleteFeature = expressAsyncHandler(async(req, res) => {
  const Feature = await FeatureModel.findById(req.params.id)
  const delteFeature = await Feature.remove()
  if(delteFeature) {
    res.status(200).json({message: "Feature deleted"})
  } else {
    res.status(400).json({message: "Feature delete failed"})
  }
})

export { createFeature, getSingleFeature, getAllFeatures, deleteFeature, editFeature };

