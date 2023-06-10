import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import HospitalTypeModel from '../models/hospitalTypeModel.js';

// Create 
const createHospitalType = expressAsyncHandler( async(req, res) => {
  const { en: {basicInfo: {name}}, en, bn, logo } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const Specialist = await HospitalTypeModel.create({en, bn, logo, enSlug, bnSlug})
  
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
    res.status(400).json({message: "Hospital type create failed"})
  }
})

// Edit HospitalType
const editHospitalType = expressAsyncHandler( async (req, res) => {
  const HospitalType = await HospitalTypeModel.findById(req.params.id)
  
  if(HospitalType) {
    const updatedSpecial = await HospitalTypeModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "HospitalType update error"})
  }
})


// Get single HospitalTypes
const getSingleHospitalType = expressAsyncHandler(async(req, res) => {
  const HospitalType = await HospitalTypeModel.findById(req.params.id)
  if(HospitalType) {
    res.status(200).json(HospitalType)
  } else {
    res.status(404)
    throw new Error("HospitalType not found")
  }
})

// Get all HospitalTypes
// const getAllHospitalTypes = expressAsyncHandler(async(req, res) => {
//   const hospitalTypes = await HospitalTypeModel.find({}).sort({createdAt: 'desc'})
//   console.log('hospitalTypes', hospitalTypes)
//   if(hospitalTypes) {
//     res.status(200).json(hospitalTypes)
//   } else {
//     res.status(404).json({message: "All HospitalTypes not found"})
//   }
// })

const getAllHospitalTypes = expressAsyncHandler(async(req, res) => {
  const Services = await HospitalTypeModel.find({}).sort({createdAt: 'desc'})
  if(Services) {
    res.status(200).json(Services)
  } else {
    res.status(404).json({message: "All Types not found"})
  }
//   HospitalTypeModel.find({}, function(err, docs){
//     res.status(200).json(docs)
//  });
})

// Delete HospitalType
const deleteHospitalType = expressAsyncHandler(async(req, res) => {
  const HospitalType = await HospitalTypeModel.findById(req.params.id)
  const delteHospitalType = await HospitalType.remove()
  if(delteHospitalType) {
    res.status(200).json({message: "HospitalType deleted"})
  } else {
    res.status(400).json({message: "HospitalType delete failed"})
  }
})

export { createHospitalType, getSingleHospitalType, getAllHospitalTypes, deleteHospitalType, editHospitalType };

