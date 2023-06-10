import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import SoftwareModel from '../models/softwareModel.js';
// import slugify from 'slugify'
import DegreeModel from '../models/doctorDegreeModel.js';
import SpecialistModel from '../models/doctorSpecialistModel.js';
import LocationModel from '../models/locationModel.js';

// CREATE POST
const createSoftwareController = asyncHandler(async(req, res) => {
  const {basicInfo,specification,socialMedia,prosCons,pricing,messages,productTable,comparisons,productAds,videos,screenShots,claimed,publisher,articles,categories,reviews} = req.body;
  
  let slug = slugify(basicInfo?.name).toLowerCase()

  const doctor = await SoftwareModel.findOne({'slug': slug})
  if(doctor?.slug === slug) {
    return res.status(404).json({error: "Software slug is already exist!"})
  }

    const createSoftware = await SoftwareModel.create({basicInfo,specification,socialMedia,prosCons,pricing,messages,productTable,comparisons,productAds,slug,videos,screenShots,claimed,publisher,articles,categories,reviews})

    // await LocationModel.updateMany({
    //   _id: location
    // }, {
    //   $push: {
    //     doctors: createSoftware._id
    //   }
    // }, {"multi": true})

    // // degree
    // await DegreeModel.updateMany({
    //   _id: degree
    // }, {
    //   $push: {
    //     doctors: createSoftware._id
    //   }
    // }, {"multi": true})
    
    // // specialist
    // await SpecialistModel.updateMany({
    //   _id: specialist
    // }, {
    //   $push: {
    //     doctors: createSoftware._id
    //   }
    // }, {"multi": true})
    
    if(createSoftware) {
      res.status(201).json({
        _id: createSoftware._id,
        basicInfo: createSoftware.basicInfo,
        specification: createSoftware.specification,  
        socialMedia: createSoftware.socialMedia,  
        prosCons: createSoftware.prosCons,      
        pricing: createSoftware.pricing,
        messages: createSoftware.messages,
        productTable: createSoftware.productTable,
        comparisons: createSoftware.comparisons,
        productAds: createSoftware.productAds,
        videos: createSoftware.videos,
        screenShots: createSoftware.screenShots,
        claimed: createSoftware.claimed,
        publisher: createSoftware.publisher,
        articles: createSoftware.articles,
        categories: createSoftware.categories,
        reviews: createSoftware.reviews,
        slug: createSoftware.slug,
      })
      
    } else {
      res.status(400).json({msg: "Software created faield"})
    }

})

// EDIT Doctor
const updateSoftwareController = asyncHandler(async(req, res) => {

    const doctorslug = req.params.slug;
    const doctorState = req.body;

    const query = {
      slug: doctorslug,
    };

    const update = {
      $set: doctorState,
    };

    const result = await SoftwareModel.updateOne(query, update);

    if (result.matchedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Software updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Software update failed",
      });
    }
})

// GET Single Software
const detailsSoftwareController = asyncHandler(async(req, res) => {

    const doctor = await SoftwareModel.findOne({'slug': req.params.slug})
  //   .populate('articles', 'en bn slug bnSlug thumb createdAt')
  //   .populate('location', 'name slug')
  //   .populate('degree')
  //   .populate('specialist')
  //   .populate({ 
  //     path: 'chamber',
  //     populate: {
  //       path: 'hospital',
  //       model: 'Hospital'
  //     } 
  //  })
  //  .populate({ 
  //   path: 'currentJob',
  //   populate: {
  //     path: 'hospitalName',
  //     model: 'Hospital'
  //   },
  //   populate: {
  //     path: 'department',
  //     model: 'DoctorSpecialist'
  //   },
  //   populate: {
  //     path: 'jobDesignation',
  //     model: 'JobDesignation'
  //   } 
  // })
  // .populate({ 
  //   path: 'common',
  //   populate: {
  //     path: 'doctorType',
  //     model: 'DoctorType'
  //   },
  // })
  // .populate({ 
  //   path: 'experience',
  //   populate: {
  //     path: 'hospitalName',
  //     model: 'Hospital'
  //   },
  //   populate: {
  //     path: 'department',
  //     model: 'DoctorSpecialist'
  //   },
  //   populate: {
  //     path: 'jobDesignation',
  //     model: 'JobDesignation'
  //   } 
  // })

  if(doctor) {
    res.status(200).json(doctor)
  } else {
    res.status(404).json({error: "Software not found"})
  }
})

// ALL Doctor LIST
const allSoftwareController = asyncHandler( async( req, res) => {
  const users = await SoftwareModel.find({})
  // .populate('user', 'name slug')
  // .populate('location', 'name slug')
  // .populate('degree', 'enName bnName')
  // .populate('specialist', 'en bn')
  // .populate({ 
  //   path: 'common.basicInfo',
  //   populate: {
  //     path: 'doctorType',
  //     model: 'DoctorType'
  //   },
  // })
  // .populate({ 
  //   path: 'experience',
  //   populate: {
  //     path: 'hospitalName',
  //     model: 'Hospital'
  //   },
  //   populate: {
  //     path: 'department',
  //     model: 'DoctorSpecialist'
  //   },
  //   populate: {
  //     path: 'jobDesignation',
  //     model: 'JobDesignation'
  //   } 
  // })
  .sort({createdAt: 'desc'})
  if(users) {
    res.status(200).json(users)
  } else {
    res.status(404).json({msg: "Software not found"})
  }
})

// DELETE POST
const deleteSoftwareController = asyncHandler(async(req, res) => {
  const Software = await SoftwareModel.findById(req.params.id)
  if(!Software) {
    res.status(404)
    throw new Error("Software not found")
  } else {
    const deleteSoftware = await Software.remove()
    if(deleteSoftware) {
      res.status(200).json({message: "Software deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

// delete all software
const deleteAllSoftwareController = async (req, res) => {
  try {
    // Delete all documents in the collection
    const result = await SoftwareModel.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} documents deleted.` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting documents.' });
  }
};

export {
  createSoftwareController,
  deleteSoftwareController,
  updateSoftwareController,
  detailsSoftwareController,
  deleteAllSoftwareController,
  allSoftwareController
};

