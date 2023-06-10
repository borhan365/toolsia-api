import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import HospitalSpecialistModel from '../models/hospitalSpecialistModel.js';

// Create 
const createHospitalSpecialist = expressAsyncHandler( async(req, res) => {
  const { en: {basicInfo: {name}}, en, bn, logo } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const Specialist = await HospitalSpecialistModel.create({en, bn, logo, enSlug, bnSlug})
  
  if(Specialist) {
    res.status(201).json({
      _id: Specialist.id,
      en: Specialist.en,
      bn: Specialist.bn,
      logo: Specialist.logo,
      enSlug: enSlug,
      bnSlug: bnSlug,
    })
  } else {
    res.status(400).json({message: "HospitalSpecialist create failed"})
  }
})

// Edit HospitalSpecialist
const editHospitalSpecialist = expressAsyncHandler( async (req, res) => {
  const HospitalSpecialist = await HospitalSpecialistModel.findById(req.params.id)
  
  if(HospitalSpecialist) {
    const updatedSpecial = await HospitalSpecialistModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "HospitalSpecialist update error"})
  }
})


// Get single HospitalSpecialists
const getSingleHospitalSpecialist = expressAsyncHandler(async(req, res) => {
  const HospitalSpecialist = await HospitalSpecialistModel.findById(req.params.id)
  if(HospitalSpecialist) {
    res.status(200).json(HospitalSpecialist)
  } else {
    res.status(404)
    throw new Error("HospitalSpecialist not found")
  }
})

// Get all HospitalSpecialists
const getAllHospitalSpecialists = expressAsyncHandler(async(req, res) => {
  const HospitalSpecialists = await HospitalSpecialistModel.find({}).sort({createdAt: 'desc'})
  if(HospitalSpecialists) {
    res.status(200).json(HospitalSpecialists)
  } else {
    res.status(404).json({message: "All HospitalSpecialists not found"})
  }
})

// Delete HospitalSpecialist
const deleteHospitalSpecialist = expressAsyncHandler(async(req, res) => {
  const HospitalSpecialist = await HospitalSpecialistModel.findById(req.params.id)
  const delteHospitalSpecialist = await HospitalSpecialist.remove()
  if(delteHospitalSpecialist) {
    res.status(200).json({message: "HospitalSpecialist deleted"})
  } else {
    res.status(400).json({message: "HospitalSpecialist delete failed"})
  }
})

export { createHospitalSpecialist, getSingleHospitalSpecialist, getAllHospitalSpecialists, deleteHospitalSpecialist, editHospitalSpecialist };

