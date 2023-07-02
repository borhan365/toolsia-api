import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import SoftwareParentCategory from '../../models/software/softwareParentCatModel.js';
import SoftwareSubCategory from '../../models/software/softwareSubCatModel.js';
import SoftwareChildCategory from '../../models/software/softwareChildCatModel.js'

// CREATE CATEGOROY
const createCategory = asyncHandler( async(req, res) => {
  const {    
    basicInfo,
    thumbnail,
    buyingGuide,
    featuredLinks,
    parentCategory,
    subCategory,
  } = req.body;

  const {name } = req.body.basicInfo;

  let slug = slugify(name).toLowerCase() || "null"

  const product = await SoftwareChildCategory.findOne({'slug': slug})
  if(product?.slug === slug) {
    return res.status(404).json({error: "Category slug is already exist!"})
  }

  const createCat = await SoftwareChildCategory.create({
    basicInfo,
    thumbnail,
    buyingGuide,
    featuredLinks,
    slug,
    parentCategory,
    subCategory,
  })

  // add this sub category into parent category
  await SoftwareSubCategory.updateOne({
    _id: subCategory
  }, {
    $push: {
      childCategories: createCat._id
    }
  })

  if(createCat) {
    res.status(201).json(createCat)
  } else {
    res.status(400).json({msg: "Software category create failed!"})
  }
})

// DELETE CATEGORY
const deleteCategory = asyncHandler(async(req, res) => {
  const category = await SoftwareChildCategory.findById(req.params.id)
  const deleteCategory = SoftwareChildCategory.remove()

  if(deleteCategory) {
    res.status(200).json({msg: "Category deleted successfully!"})
  } else {
    res.status(404).json({msg: "Category not found"})
  }
})

// ALL CATEGORIES
const allCategories = asyncHandler(async(req, res) => {
  const category = await SoftwareChildCategory.find({})

  if(category) {
    res.status(200).json(category)
  } else {
    res.status(400).json("Category not found!")
  }

})

// GET SINGLE CATEGORY 
const singleCategory = asyncHandler( async( req, res) => {
  const category = await SoftwareChildCategory.findOne({slug: req.params.slug})

  if(!category) {
    return res.status(404).json({msg: "category not found"})
  }

  res.json(category);

})

// UPDATE CATEGORY
const updateCategory = asyncHandler( async (req, res) => {
  const category = await SoftwareChildCategory.findById(req.params.id)
  
  if(category) {
    const updateCat = await SoftwareChildCategory.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateCat)
  } else {
    res.status(404).json({msg: "Category update error"})
  }
})

// delete all software
const deleteAllSoftwareCategoriesController = async (req, res) => {
  try {
    // Delete all documents in the collection
    const result = await SoftwareChildCategory.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} documents deleted.` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting documents.' });
  }
};


export {
  allCategories, createCategory, deleteAllSoftwareCategoriesController, deleteCategory, singleCategory,
  updateCategory
};

