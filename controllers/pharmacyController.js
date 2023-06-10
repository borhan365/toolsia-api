import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import PharmacyModel from '../models/pharmacyModel.js';

// CREATE Pharmacy
const createPharmacyController = asyncHandler(async(req, res) => {
  const {name, email, website, video, address, numberOne, numberTwo, excerpt, description, extraMessage, logo, postStatus, location, publisher} = req.body;
  
  let slug = slugify(name).toLowerCase()

    const pharmacyCreate = await PharmacyModel.create({
      name, slug, email, website, video, numberOne, numberTwo, excerpt, description, extraMessage, logo, postStatus, location, publisher
    })
    
    if(pharmacyCreate) {
      res.status(201).json({
        _id: pharmacyCreate._id,
        name: pharmacyCreate.name,
        slug: slugify(name).toLowerCase(),
        email: pharmacyCreate.email,
        website: pharmacyCreate.website,
        video: pharmacyCreate.video,
        address: pharmacyCreate.address,
        numberOne: pharmacyCreate.numberOne,
        numberTwo: pharmacyCreate.numberTwo,
        excerpt: pharmacyCreate.excerpt,
        description: pharmacyCreate.description,
        extraMessage: pharmacyCreate.extraMessage,
        logo: pharmacyCreate.logo,
        status: pharmacyCreate.status,
        location: pharmacyCreate.location,
        publisher: pharmacyCreate.publisher,
      })
      
    } else {
      res.status(400).json({msg: "Pharmacy created faield"})
    }

})

// EDIT Pharmacy
const updatePharmacyController = asyncHandler(async(req, res) => {
  try {
    delete req.body._id
    const amb = await PharmacyModel.findOne({slug: req.params.slug})

    if (amb) {
      const updateAmb = await PharmacyModel.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateAmb)
    } else {
      res.status(401).json("Unauthorize Activity!");
    }
  } catch (error) {
    console.log(error)
    res.status(404)
      throw new Error('Pharmacy not found')
  }
})

// GET SINGLE Pharmacy
const detailsPharmacyController = asyncHandler(async(req, res) => {
    await PharmacyModel.findOne({slug: req.params.slug}).populate('location', 'name slug').populate('publisher', 'name slug')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data);
        });
})

// ALL Pharmacy LIST
const allPharmacyController = asyncHandler( async( req, res) => {
  const ambs = await PharmacyModel.find({}).sort({createdAt: 'desc'})
  if(ambs) {
    res.status(200).json(ambs)
  } else {
    res.status(404).json({msg: "No Pharmacy found!"})
  }
})

// DELETE Pharmacy
const deletePharmacyController = asyncHandler(async(req, res) => {
  const amb = await PharmacyModel.findOne(req.params.id)
  if(!amb) {
    res.status(404)
    throw new Error("Pharmacy not found")
  } else {
    const deletedAmb = await amb.remove()
    if(deletedAmb) {
      res.status(200).json({message: "Pharmacy deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createPharmacyController,
  deletePharmacyController,
  updatePharmacyController,
  detailsPharmacyController,
  allPharmacyController
};

