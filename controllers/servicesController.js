import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import ServiceModel from '../models/hospitalServicesModel.js';

// Create 
const createService = expressAsyncHandler( async(req, res) => {
  const { enName, bnName, icon, logo } = req.body;
  const slug = slugify(enName).toLowerCase()

  const Specialist = await ServiceModel.create({enName, bnName, icon, logo, slug})
  
  if(Specialist) {
    res.status(201).json({
      _id: Specialist.id,
      enName: Specialist.enName,
      bnName: Specialist.bnName,
      icon: Specialist.icon,
      logo: Specialist.logo,
      slug: Specialist.slug,
    })
  } else {
    res.status(400).json({message: "Service create failed"})
  }
})

// Edit Service
const editService = expressAsyncHandler( async (req, res) => {
  const Service = await ServiceModel.findById(req.params.id)
  
  if(Service) {
    const updatedSpecial = await ServiceModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updatedSpecial)
  } else {
    res.status(404).json({msg: "Service update error"})
  }
})


// Get single Services
const getSingleService = expressAsyncHandler(async(req, res) => {
  const Service = await ServiceModel.findById(req.params.id)
  if(Service) {
    res.status(200).json(Service)
  } else {
    res.status(404)
    throw new Error("Service not found")
  }
})

// Get all Services
const getAllServices = expressAsyncHandler(async(req, res) => {
  const Services = await ServiceModel.find({}).sort({createdAt: 'desc'})
  if(Services) {
    res.status(200).json(Services)
  } else {
    res.status(404).json({message: "All Services not found"})
  }
})

// Delete Service
const deleteService = expressAsyncHandler(async(req, res) => {
  const Service = await ServiceModel.findById(req.params.id)
  const delteService = await Service.remove()
  if(delteService) {
    res.status(200).json({message: "Service deleted"})
  } else {
    res.status(400).json({message: "Service delete failed"})
  }
})

export { createService, getSingleService, getAllServices, deleteService, editService };

