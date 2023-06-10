import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import GenericModel from '../models/genericModel.js';

// Create 
const createGeneric = expressAsyncHandler( async(req, res) => {
  const { en, bn, common } = req.body;
  const enSlug = slugify(en?.name).toLowerCase() 
  const bnSlug = slugify(en?.name).toLowerCase() + "-bn"

  const Generic = await GenericModel.create({en, bn, common, enSlug, bnSlug})
  
  if(Generic) {
    res.status(201).json({
      _id: Generic.id,
      en: Generic.en,
      bn: Generic.bn,
      common: Generic.common,
      enSlug: Generic.enSlug,
      bnSlug: Generic.bnSlug,
    })
  } else {
    res.status(400).json({message: "Generic create failed"})
  }
})

// Edit Generic
const editGeneric = expressAsyncHandler( async (req, res) => {
  const Generic = await GenericModel.findById(req.params.id)
  
  if(Generic) {
    const updateGeneric = await GenericModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateGeneric)
  } else {
    res.status(404).json({msg: "Generic update error"})
  }
})


// Get single Generics
const getSingleGeneric = expressAsyncHandler(async(req, res) => {
  const Generic = await GenericModel.findById(req.params.id)
  if(Generic) {
    res.status(200).json(Generic)
  } else {
    res.status(404)
    throw new Error("Generic not found")
  }
})

// Get all Generics
const getAllGenerics = expressAsyncHandler(async(req, res) => {
  const Generics = await GenericModel.find({}).sort({createdAt: 'desc'}).populate('medicines')
  if(Generics) {
    res.status(200).json(Generics)
  } else {
    res.status(404).json({message: "All Generics not found"})
  }
})

// Delete Generic
const deleteGeneric = expressAsyncHandler(async(req, res) => {
  const Generic = await GenericModel.findById(req.params.id)
  const delteGeneric = await Generic.remove()
  if(delteGeneric) {
    res.status(200).json({message: "Generic deleted"})
  } else {
    res.status(400).json({message: "Generic delete failed"})
  }
})

export { createGeneric, getSingleGeneric, getAllGenerics, deleteGeneric, editGeneric };

