import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import DoctorTypeModel from '../models/doctorTypeModel.js';

// Create 
const createDoctorType = expressAsyncHandler( async(req, res) => {
  const { en: {name}, en, bn, thumb } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const DoctorType = await DoctorTypeModel.create({en, bn, thumb, enSlug, bnSlug})
  
  if(DoctorType) {
    res.status(201).json({
      _id: DoctorType.id,
      en: DoctorType.en,
      bn: DoctorType.bn,
      thumb: DoctorType.thumb,
      enSlug: slugify(name).toLowerCase(),
      bnSlug: slugify(name).toLowerCase() + "-bn"
    })
  } else {
    res.status(400).json({message: "DoctorType create failed"})
  }
})

// Edit DoctorType
const editDoctorType = expressAsyncHandler( async (req, res) => {
  const DoctorType = await DoctorTypeModel.find({slug: req.params.slug})
  
  if(DoctorType) {
    const updateDoctorType = await DoctorTypeModel.findByIdAndUpdate(req.params.slug, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateDoctorType)
  } else {
    res.status(404).json({msg: "DoctorType update error"})
  }
})


// Get single DoctorTypes
const getSingleDoctorType = expressAsyncHandler(async(req, res) => {
  const DoctorType = await DoctorTypeModel.findOne({ slug: req.params.slug })
      .exec((err, data) => {
          if (err) {
              return res.json({
                  error: errorHandler(err)
              });
          }
          res.json(data);
      });
})

// Get all DoctorTypes
const getAllDoctorTypes = expressAsyncHandler(async(req, res) => {
  const DoctorTypes = await DoctorTypeModel.find({}).sort({createdAt: 'desc'}).populate('doctors')
  if(DoctorTypes) {
    res.status(200).json(DoctorTypes)
  } else {
    res.status(404).json({message: "All DoctorTypes not found"})
  }
})

// Delete DoctorType
const deleteDoctorType = expressAsyncHandler(async(req, res) => {
  const DoctorType = await DoctorTypeModel.findOne({slug: req.params.slug})
  const delteDoctorType = await DoctorType.remove()
  if(delteDoctorType) {
    res.status(200).json({message: "DoctorType deleted"})
  } else {
    res.status(400).json({message: "DoctorType delete failed"})
  }
})

export { createDoctorType, getSingleDoctorType, getAllDoctorTypes, deleteDoctorType, editDoctorType };

