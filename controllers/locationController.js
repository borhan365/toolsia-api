import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import Location from '../models/locationModel.js';


function createSubLocation (createCat, parentId = null) {
  const categories = []
  let Location;

  if(parentId == null) {
    Location = createCat.filter(cat => cat.parentId == undefined)
  } else {
    Location = createCat.filter(cat => cat.parentId == parentId)
  }

  for (let cat of Location) {
    categories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      onLineIntro: cat.onLineIntro,
      excerpt: cat.excerpt,
      description: cat.description,
      flag: cat.flag,
      thumbnail: cat.thumbnail,
      hightlight: cat.hightlight,
      table: cat.table,
      suggestLinks: cat.suggestLinks,
      parentId: cat.parentId,
      createdAt: cat.createdAt,
      children: createSubLocation(createCat, cat._id),
    });
  }

  return categories; 

}


// CREATE CATEGOROY
const createLocation = asyncHandler( async(req, res) => {
  const {
    name,
    onLineIntro,
    excerpt,
    description,
    flag,
    thumbnail,
    hightlight,
    table,
    suggestLinks,
    parentId,
  } = req.body;

  let slug = slugify(name).toLowerCase() || "null"

  const createCat = await Location.create({
    name,
    slug,
    onLineIntro,
    excerpt,
    description,
    flag,
    thumbnail,
    hightlight,
    table,
    suggestLinks,
    parentId,
  });

  if(createCat) {
    res.status(201).json(createCat)
  } else {
    res.status(400).json({msg: "Location create failed!"})
  }
})

// DELETE Location
const deleteLocation = asyncHandler(async(req, res) => {
  const location = await Location.findById(req.params.id)
  const deleteLocation = location.remove()

  if(deleteLocation) {
    res.status(200).json({msg: "Location deleted successfully!"})
  } else {
    res.status(404).json({msg: "Location not found"})
  }
})

// ALL CATEGORIES
const allLocations = asyncHandler(async(req, res) => {
  const location = await Location.find({})

  const LocationList = createSubLocation(location)

  if(location) {
    res.status(200).json(LocationList)
  } else {
    res.status(400)
    throw new Error("Location not found!")
  }

})


// GET SINGLE Location 
const singleLocation = asyncHandler( async( req, res) => {
  const location = await Location.findById(req.params.id)

  if(location) {
    res.status(200).json(location)
  } else {
    res.status(404)
    throw new Error("Location not found")
  }

})

// UPDATE Location
const updateLocation = asyncHandler( async (req, res) => {
  const location = await Location.findById(req.params.id)
  
  if(location) {
    const updateCat = await Location.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateCat)
  } else {
    res.status(404).json({msg: "Location update error"})
  }
})


  // Controller to delete all documents
  const deleteAll = async (req, res) => {
    try {
      // Delete all documents
      await Location.deleteMany();

      res.json({ message: 'All documents deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

// GET SINGLE Location 
const getStateLocation = asyncHandler( async( req, res) => {
  const location = await Location.findOne({slug: req.params.slug})

  if(location) {
    res.status(200).json(location)
  } else {
    res.status(404)
    throw new Error("State location not found")
  }

})

export {
  createLocation,
  deleteLocation,
  allLocations,
  singleLocation,
  updateLocation,
  deleteAll,
  getStateLocation
};

