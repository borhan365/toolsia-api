import asyncHandler from 'express-async-handler';
import BloodBankModel from '../models/bloodBankModel.js';
import slugify from 'slugify'

// CREATE BloodBank
const createBloodBankController = asyncHandler(async(req, res) => {
  const {name, email, website, video, numberOne, numberTwo, excerpt, description, extraMessage, banner, status, location, user} = req.body;
  
  let slug = slugify(name).toLowerCase()

    const bloodBankCreate = await BloodBankModel.create({
      name, slug, email, website, video, numberOne, numberTwo, excerpt, description, extraMessage, banner, status, location, user
    })
    
    if(bloodBankCreate) {
      res.status(201).json({
        _id: bloodBankCreate._id,
        name: bloodBankCreate.name,
        slug: slugify(name).toLowerCase(),
        email: bloodBankCreate.email,
        website: bloodBankCreate.website,
        video: bloodBankCreate.video,
        numberOne: bloodBankCreate.numberOne,
        numberTwo: bloodBankCreate.numberTwo,
        excerpt: bloodBankCreate.excerpt,
        description: bloodBankCreate.description,
        extraMessage: bloodBankCreate.extraMessage,
        banner: bloodBankCreate.banner,
        status: bloodBankCreate.status,
        location: bloodBankCreate.location,
        user: bloodBankCreate.user,
      })
      
    } else {
      res.status(400).json({msg: "Blood Bank created faield"})
    }

})

// EDIT BloodBank
const updateBloodBankController = asyncHandler(async(req, res) => {
  try {
    delete req.body._id
    const bloodbnk = await BloodBankModel.findById(req.params.slug)

    if (bloodbnk) {
      const updatebloodbnk = await BloodBankModel.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updatebloodbnk)
    } else {
      res.status(401).json("Unauthorize Activity!");
    }
  } catch (error) {
    console.log(error)
    res.status(404)
      throw new Error('BloodBank not found')
  }
})

// GET SINGLE BloodBank
const detailsBloodBankController = asyncHandler(async(req, res) => {
    await BloodBankModel.findById(req.params.slug)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            return res.json(data);
        });
})

// ALL BloodBank LIST
const allBloodBankController = asyncHandler( async( req, res) => {
  const bloodbnks = await BloodBankModel.find({}).populate('user').sort({createdAt: 'desc'}).populate('location')
  if(bloodbnks) {
    res.status(200).json(bloodbnks)
  } else {
    res.status(404).json({msg: "No Blood Bank found!"})
  }
})

// DELETE BloodBank
const deleteBloodBankController = asyncHandler(async(req, res) => {
  const bloodbnk = await BloodBankModel.findById(req.params.id)
  if(!bloodbnk) {
    res.status(404)
    throw new Error("Blood Bank not found")
  } else {
    const deletedBloodbnk = await bloodbnk.remove()
    if(deletedBloodbnk) {
      res.status(200).json({message: "Blood Bank deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createBloodBankController,
  deleteBloodBankController,
  updateBloodBankController,
  detailsBloodBankController,
  allBloodBankController
};
