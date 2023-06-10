import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import BloodDonnerModel from '../models/bloodDonnerModel.js';

// CREATE BloodDonner
const createBloodDonnerController = asyncHandler(async(req, res) => {
  const {en, bn, common, location, user} = req.body;
  
  let enSlug = slugify(en?.name).toLowerCase()
  let bnSlug = slugify(en?.name).toLowerCase() + "-bn"

    const bloodDonnerCreate = await BloodDonnerModel.create({ en, bn, common, location, user, enSlug, bnSlug })
    
    if(bloodDonnerCreate) {
      res.status(201).json({
        _id: bloodDonnerCreate._id,
        en: bloodDonnerCreate.en,
        bn: bloodDonnerCreate.bn,
        common: bloodDonnerCreate.common,
        enSlug: bloodDonnerCreate.enSlug,
        bnSlug: bloodDonnerCreate.bnSlug,
        location: bloodDonnerCreate.location,
        user: bloodDonnerCreate.user,
      })
      
    } else {
      res.status(400).json({msg: "Blood Donner created faield"})
    }

})

// EDIT BloodDonner
const updateBloodDonnerController = asyncHandler(async(req, res) => {
  try {
    delete req.body._id
    const bloodDonr = await BloodDonnerModel.findById(req.params.enSlug)

    if (bloodDonr) {
      const updatebloodDonr = await BloodDonnerModel.findOneAndUpdate(req.params.enSlug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updatebloodDonr)
    } else {
      res.status(401).json("Unauthorize Activity!");
    }
  } catch (error) {
    console.log(error)
    res.status(404)
      throw new Error('Blood Donner not found')
  }
})

// GET SINGLE BloodDonner
const detailsBloodDonnerController = asyncHandler(async(req, res) => {
    await BloodDonnerModel.findById(req.params.enSlug)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data);
        });
})

// ALL BloodDonner LIST
const allBloodDonnerController = asyncHandler( async( req, res) => {
  const bloodDonrs = await BloodDonnerModel.find({}).populate('user').sort({createdAt: 'desc'}).populate('location')
  if(bloodDonrs) {
    res.status(200).json(bloodDonrs)
  } else {
    res.status(404).json({msg: "No Blood Donner found!"})
  }
})

// DELETE BloodDonner
const deleteBloodDonnerController = asyncHandler(async(req, res) => {
  const bloodDonr = await BloodDonnerModel.findById(req.params.id)
  if(!bloodDonr) {
    res.status(404)
    throw new Error("Blood Donner not found")
  } else {
    const deletedbloodDonr = await bloodDonr.remove()
    if(deletedbloodDonr) {
      res.status(200).json({message: "Blood Donner deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createBloodDonnerController,
  deleteBloodDonnerController,
  updateBloodDonnerController,
  detailsBloodDonnerController,
  allBloodDonnerController
};

