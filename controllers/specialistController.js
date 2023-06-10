import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import SpecialistModel from '../models/doctorSpecialistModel.js';

// Create 
const createSpecialist = expressAsyncHandler( async(req, res) => {
  const { en: {basicInfo: {name}}, en, bn, icon, logo } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const Specialist = await SpecialistModel.create({en, bn, faqs, icon, logo, enSlug, bnSlug})
  
  if(Specialist) {
    res.status(201).json({
      _id: Specialist.id,
      en: Specialist.en,
      bn: Specialist.bn,
      faqs: Specialist.faqs,
      icon: Specialist.icon,
      logo: Specialist.logo,
      enSlug: slugify(req.body.en.basicInfo.name).toLowerCase(),
      bnSlug: slugify(req.body.en.basicInfo.name).toLowerCase() + "/bn",
    })
  } else {
    res.status(400).json({message: "Specialist create failed"})
  }
})

// Edit Specialist
const editSpecialist = expressAsyncHandler( async (req, res) => {
  const specialist = await SpecialistModel.find({enSlug: req.params.enSlug})
  
  if(specialist) {
    const updatedSpecial = await SpecialistModel.findOneAndUpdate(req.params.enSlug, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "specialist update error"})
  }
})


// Get single Specialists
const getSingleSpecialist = expressAsyncHandler(async(req, res) => {
  const Specialist = await SpecialistModel.findOne({enSlug: req.params.enSlug})
  if(Specialist) {
    res.status(200).json(Specialist)
  } else {
    res.status(404)
    throw new Error("Specialist not found")
  }
})

// Get all Specialists
const getAllSpecialists = expressAsyncHandler(async(req, res) => {
  const Specialists = await SpecialistModel.find({}).sort({createdAt: 'desc'})
  if(Specialists) {
    res.status(200).json(Specialists)
  } else {
    res.status(404).json({message: "All Specialists not found"})
  }
})

// Delete Specialist
const deleteSpecialist = expressAsyncHandler(async(req, res) => {
  const Specialist = await SpecialistModel.findById(req.params.id)
  const delteSpecialist = await Specialist.remove()
  if(delteSpecialist) {
    res.status(200).json({message: "Specialist deleted"})
  } else {
    res.status(400).json({message: "Specialist delete failed"})
  }
})

export { createSpecialist, getSingleSpecialist, getAllSpecialists, deleteSpecialist, editSpecialist };

