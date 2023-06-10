import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import DegreeModel from '../models/doctorDegreeModel.js';

// Create 
const createDegree = expressAsyncHandler( async(req, res) => {
  const { enName, bnName } = req.body;
  // const enSlug = slugify(enName).toLowerCase()
  // const bnSlug = slugify(req.body.enName).toLowerCase() + '-bn'

  const Degree = await DegreeModel.create({enName, bnName})
  
  if(Degree) {
    res.status(201).json({
      _id: Degree.id,
      enName: Degree.enName,
      bnName: Degree.bnName,
      // enSlug: Degree.enSlug,
      // bnSlug: Degree.bnSlug,
    })
  } else {
    res.status(400).json({message: "Degree create failed"})
  }
})

// Edit Degree
const editDegree = expressAsyncHandler( async (req, res) => {
  const Degree = await DegreeModel.findById(req.params.id)
  
  if(Degree) {
    const updatedSpecial = await DegreeModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "Degree update error"})
  }
})


// Get single Degrees
const getSingleDegree = expressAsyncHandler(async(req, res) => {
  const Degree = await DegreeModel.findById(req.params.id)
  if(Degree) {
    res.status(200).json(Degree)
  } else {
    res.status(404)
    throw new Error("Degree not found")
  }
})

// Get all Degrees
const getAllDegrees = expressAsyncHandler(async(req, res) => {
  const Degrees = await DegreeModel.find({}).sort({createdAt: 'desc'})
  if(Degrees) {
    res.status(200).json(Degrees)
  } else {
    res.status(404).json({message: "All Degrees not found"})
  }
})

// Delete Degree
const deleteDegree = expressAsyncHandler(async(req, res) => {
  const Degree = await DegreeModel.findById(req.params.id)
  const delteDegree = await Degree.remove()
  if(delteDegree) {
    res.status(200).json({message: "Degree deleted"})
  } else {
    res.status(400).json({message: "Degree delete failed"})
  }
})

export { createDegree, getSingleDegree, getAllDegrees, deleteDegree, editDegree };

