import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import DirectorTypeModel from '../models/directorTypeModel.js';
import HospitalDirectorModel from '../models/hospitalDirectorModel.js';
import HospitalModel from '../models/hospitalModel.js';

// Create 
const createHospitalDirector = expressAsyncHandler( async(req, res) => {
  const { en: {name}, en, bn, socialMedia, common } = req.body;
  const enSlug = slugify(name).toLowerCase()
  const bnSlug = slugify(name).toLowerCase() + "-bn"

  const Director = await HospitalDirectorModel.create({en, bn, socialMedia, common, enSlug, bnSlug})

  // push director into director types
  await DirectorTypeModel.updateOne({
    _id: Director._id
  }, {
    $push: {
      directors: Director._id
    }
  })

  // push director into director types
  await HospitalModel.updateOne({
    _id: Director._id
  }, {
    $push: {
      directors: Director._id
    }
  })
  
  if(Director) {
    res.status(201).json({
      _id: Director.id,
      en: Director.en,
      bn: Director.bn,
      socialMedia: Director.socialMedia,
      common: Director.common,
      enSlug: enSlug,
      bnSlug: bnSlug,
    })
  } else {
    res.status(400).json({message: "Hospital Director create failed"})
  }
})

// Edit HospitalDirector
const editHospitalDirector = expressAsyncHandler( async (req, res) => {
  const HospitalDirector = await HospitalDirectorModel.findById(req.params.id)
  
  if(HospitalDirector) {
    const updatedSpecial = await HospitalDirectorModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "Hospital Director update error"})
  }
})


// Get single HospitalDirectors
const getSingleHospitalDirector = expressAsyncHandler(async(req, res) => {
 
  
  // await HospitalDirectorModel.findOne({ enSlug: req.params.slug })
  // .exec((err, data) => {
  //     if (err) {
  //         return res.json({
  //             error: {message: "This english director is not found!"}
  //         });
  //     }
  //     res.json(data);
  // });
  
  await HospitalDirectorModel.findOne({ bnSlug: req.params.slug })
  .exec((err, data) => {
      if (err) {
          return res.json({
              error: {message: "This bangla director is not found!"}
          });
      }
      res.json(data);
  });
  // await HospitalDirectorModel.findOne({ enSlug: req.params.slug })
  // .exec((err, data) => {
  //     if (err) {
  //         return res.json({
  //             error: {message: "This english director is not found!"}
  //         });
  //     }
  //     res.json(data);
  // });

})


// Get all HospitalDirectors
const getAllHospitalDirectors = expressAsyncHandler(async(req, res) => {
  const HospitalDirectors = await HospitalDirectorModel.find({})
  .populate({ 
    path: 'common',
    populate: {
      path: 'directorType',
      model: 'DirectorType'
    } 
 })
  .sort({createdAt: 'desc'})
  if(HospitalDirectors) {
    res.status(200).json(HospitalDirectors)
  } else {
    res.status(404).json({message: "All HospitalDirectors not found"})
  }
})

// Delete HospitalDirector
const deleteHospitalDirector = expressAsyncHandler(async(req, res) => {
  const HospitalDirector = await HospitalDirectorModel.findById(req.params.id)
  const delteHospitalDirector = await HospitalDirector.remove()
  if(delteHospitalDirector) {
    res.status(200).json({message: "HospitalDirector deleted"})
  } else {
    res.status(400).json({message: "HospitalDirector delete failed"})
  }
})

export { createHospitalDirector, getSingleHospitalDirector, getAllHospitalDirectors, deleteHospitalDirector, editHospitalDirector };

