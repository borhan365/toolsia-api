import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import MedicineTypeModel from '../models/medicineTypeModel.js';

// Create 
const createMedicineType = expressAsyncHandler( async(req, res) => {
  const { enName, bnName, icon } = req.body;
  const enSlug = slugify(enName).toLowerCase()
  const bnSlug = slugify(enName).toLowerCase() + "-bn"

  const MedicineType = await MedicineTypeModel.create({enName, bnName, enSlug, bnSlug, icon})
  
  if(MedicineType) {
    res.status(201).json({
      _id: MedicineType.id,
      enName: MedicineType.enName,
      bnName: MedicineType.bnName,
      icon: MedicineType.icon,
      enSlug: slugify(req.body.enName).toLowerCase(),
      bnSlug: slugify(req.body.enName).toLowerCase() + "-bn",
    })
  } else {
    res.status(400).json({message: "Medicine Type create failed"})
  }
})

// Edit MedicineType
const editMedicineType = expressAsyncHandler( async (req, res) => {
  const MedicineType = await MedicineTypeModel.findById(req.params.id)
  
  if(MedicineType) {
    const updateMedicineType = await MedicineTypeModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateMedicineType)
  } else {
    res.status(404).json({msg: "MedicineType update error"})
  }
})


// Get single MedicineTypes
const getSingleMedicineType = expressAsyncHandler(async(req, res) => {
  const MedicineType = await MedicineTypeModel.findById(req.params.id)
  if(MedicineType) {
    res.status(200).json(MedicineType)
  } else {
    res.status(404)
    throw new Error("MedicineType not found")
  }
})

// Get all MedicineTypes
const getAllMedicineTypes = expressAsyncHandler(async(req, res) => {
  const MedicineTypes = await MedicineTypeModel.find({}).sort({createdAt: 'desc'})
  if(MedicineTypes) {
    res.status(200).json(MedicineTypes)
  } else {
    res.status(404).json({message: "All MedicineTypes not found"})
  }
})

// Delete MedicineType
const deleteMedicineType = expressAsyncHandler(async(req, res) => {
  const MedicineType = await MedicineTypeModel.findById(req.params.id)
  const delteMedicineType = await MedicineType.remove()
  if(delteMedicineType) {
    res.status(200).json({message: "MedicineType deleted"})
  } else {
    res.status(400).json({message: "MedicineType delete failed"})
  }
})

export { createMedicineType, getSingleMedicineType, getAllMedicineTypes, deleteMedicineType, editMedicineType };

