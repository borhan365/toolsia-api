import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import JobDesignation from '../models/jobDesignationModel.js';

// Create 
const createJobDesignation = expressAsyncHandler( async(req, res) => {
  const { en: {name}, en, bn, thumb } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const jobDesignation = await JobDesignation.create({en, bn, thumb, enSlug, bnSlug})
  
  if(jobDesignation) {
    res.status(201).json({
      _id: jobDesignation.id,
      thumb: jobDesignation.thumb,
      en: jobDesignation.en,
      bn: jobDesignation.bn,
      enSlug: slugify(enSlug).toLowerCase(),
      bnSlug: slugify(enSlug).toLowerCase() + "-bn",
    })
  } else {
    res.status(400).json({message: "Job Designation create failed"})
  }
})

// Edit JobDesignation
const editJobDesignation = expressAsyncHandler( async (req, res) => {
  const jobDesignation = await JobDesignation.findById(req.params.id)
  
  if(jobDesignation) {
    const updatedSpecial = await JobDesignation.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "Job Designation update error"})
  }
})


// Get single JobDesignations
const getSingleJobDesignation = expressAsyncHandler(async(req, res) => {
  const jobDesignation = await JobDesignation.findById(req.params.id)
  if(jobDesignation) {
    res.status(200).json(jobDesignation)
  } else {
    res.status(404)
    throw new Error("JobDesignation not found")
  }
})

// Get all JobDesignations
const getAllJobDesignations = expressAsyncHandler(async(req, res) => {
  const jobDesignation = await JobDesignation.find({}).sort({createdAt: 'desc'})
  if(jobDesignation) {
    res.status(200).json(jobDesignation)
  } else {
    res.status(404).json({message: "All JobDesignations not found"})
  }
})

// Delete JobDesignation
const deleteJobDesignation = expressAsyncHandler(async(req, res) => {
  const jobDesignation = await JobDesignation.findById(req.params.id)
  const deleteJobDesignation = await jobDesignation.remove()
  if(deleteJobDesignation) {
    res.status(200).json({message: "JobDesignation deleted"})
  } else {
    res.status(400).json({message: "JobDesignation delete failed"})
  }
})

export { createJobDesignation, getSingleJobDesignation, getAllJobDesignations, deleteJobDesignation, editJobDesignation };

