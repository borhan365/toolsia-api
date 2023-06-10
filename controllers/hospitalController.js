import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { errorHandler } from '../middleware/errorMiddleware.js';
import HospitalFeatures from '../models/hospitalFeaturesModel.js';
import HospitalModel from '../models/hospitalModel.js';
import HospitalServices from '../models/hospitalServicesModel.js';
import LocationModel from '../models/locationModel.js';
import UserModel from '../models/userModel.js';

const createHospitalController = asyncHandler(async(req, res) => {
  const {en, bn, common, faqs, messages, floorWiseDetails, user, location, branch, features, services, directors} = req.body;

  let enSlug = slugify(en?.basicInfo?.name).toLowerCase()
  let bnSlug = slugify(en?.basicInfo?.name).toLowerCase() + "-bn"

    const HospitalCreate = await HospitalModel.create({
      en, bn, common, faqs, messages, floorWiseDetails, user, location, branch, features, services, directors, enSlug, bnSlug
      // user: req.user._id
    })

    // location
    await LocationModel.updateMany({
      _id: location
    }, {
      $push: {
        Hospitals: HospitalCreate._id
      }
    }, {"multi": true})

    // user
    await UserModel.updateOne({
      _id: user
    }, {
      $push: {
        Hospital: HospitalCreate._id
      }
    })

    // features
    await HospitalFeatures.updateMany({
      _id: features
    }, {
      $push: {
        Hospitals: HospitalCreate._id
      }
    }, {"multi": true})

    // services
    await HospitalServices.updateMany({
      _id: services
    }, {
      $push: {
        Hospitals: HospitalCreate._id
      }
    }, {"multi": true})
    
    if(HospitalCreate) {
      res.status(201).json({
        _id: HospitalCreate._id,
        en: HospitalCreate.en,
        bn: HospitalCreate.bn,
        common: HospitalCreate.common,
        faqs: HospitalCreate.faqs,
        messages: HospitalCreate.messages,
        floorWiseDetails: HospitalCreate.floorWiseDetails,
        user: HospitalCreate.user,
        location: HospitalCreate.location,
        branch: HospitalCreate.branch,
        features: HospitalCreate.features,
        services: HospitalCreate.services,
        directors: HospitalCreate.directors,
        enSlug: HospitalCreate.enSlug,
        bnSlug: HospitalCreate.bnSlug,
      })
      
    } else {
      res.status(400)
      throw new Error("Hospital create failed!")
    }
})

// EDIT Hospital
const updateHospitalController = asyncHandler(async(req, res) => {

  const hospitalEnSlug = req.params.enSlug;
    const hospitalState = req.body;

    const query = {
      enSlug: hospitalEnSlug,
    };

    const update = {
      $set: hospitalState,
    };

    const result = await HospitalModel.updateOne(query, update);

    if (result.matchedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Hospital updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Hospital Updating Fail!",
      });
    }
})

// GET SINGLE Hospital
const detailsHospitalController = asyncHandler(async(req, res) => {
  
    await HospitalModel.findOne({ enSlug: req.params.enSlug })
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
})

// ALL Hospital LIST
const allHospitalController = asyncHandler( async( req, res) => {
  const users = await HospitalModel.find({}).populate('user').sort({createdAt: 'desc'})
  if(users) {
    res.status(200).json(users)
  } else {
    res.status(404).json({msg: "Hospital not found"})
  }
})

// DELETE POST
const deleteHospitalController = asyncHandler(async(req, res) => {
  const Hospital = await HospitalModel.findById(req.params.id)
  if(!Hospital) {
    res.status(404)
    throw new Error("Hospital not found")
  } else {
    const deleteHospital = await Hospital.remove()
    if(deleteHospital) {
      res.status(200).json({message: "Hospital deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

// delete all hospitals
const deleteAllHospitalController = asyncHandler(async(req, res) => {
  const deleteAll = await HospitalModel.deleteMany()
  if(deleteAll) {
    res.status(200).json("Deleted successfully!")
  } else {
    res.status(404).json("File not found for delete!")
  }
})

export {
  createHospitalController,
  deleteHospitalController,
  updateHospitalController,
  detailsHospitalController,
  allHospitalController,
  deleteAllHospitalController
};

