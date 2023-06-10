import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import DirectorTypeModel from '../models/directorTypeModel.js';

// Create 
const createDirectorType = expressAsyncHandler( async(req, res) => {
  const { enName, bnName } = req.body;

  const bnSlug = slugify(enName).toLocaleLowerCase() + "-bn"
  const enSlug = slugify(enName).toLocaleLowerCase()

  const DirectorType = await DirectorTypeModel.create({enName, bnName, bnSlug, enSlug})
  
  if(DirectorType) {
    res.status(201).json({
      _id: DirectorType.id,
      enName: DirectorType.enName,
      bnName: DirectorType.bnName,
      bnSlug: bnSlug,
      enSlug: enSlug,
    })
  } else {
    res.status(400).json({message: "DirectorType create failed"})
  }
})

// Edit DirectorType
const editDirectorType = expressAsyncHandler( async (req, res) => {
  const DirectorType = await DirectorTypeModel.findById(req.params.id)
  
  if(DirectorType) {
    const updateDirectorType = await DirectorTypeModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateDirectorType)
  } else {
    res.status(404).json({msg: "DirectorType update error"})
  }
})


// Get single DirectorTypes
const getSingleDirectorType = expressAsyncHandler(async(req, res) => {
  const DirectorType = await DirectorTypeModel.findById(req.params.id)
  if(DirectorType) {
    res.status(200).json(DirectorType)
  } else {
    res.status(404)
    throw new Error("DirectorType not found")
  }
})

// Get all DirectorTypes
const getAllDirectorTypes = expressAsyncHandler(async(req, res) => {
  const DirectorTypes = await DirectorTypeModel.find({}).sort({createdAt: 'desc'})
  if(DirectorTypes) {
    res.status(200).json(DirectorTypes)
  } else {
    res.status(404).json({message: "All DirectorTypes not found"})
  }
})

// Delete DirectorType
const deleteDirectorType = expressAsyncHandler(async(req, res) => {
  const DirectorType = await DirectorTypeModel.findById(req.params.id)
  const delteDirectorType = await DirectorType.remove()
  if(delteDirectorType) {
    res.status(200).json({message: "DirectorType deleted"})
  } else {
    res.status(400).json({message: "DirectorType delete failed"})
  }
})

export { createDirectorType, getSingleDirectorType, getAllDirectorTypes, deleteDirectorType, editDirectorType };

