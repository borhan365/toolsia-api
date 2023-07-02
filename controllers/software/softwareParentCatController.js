import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import SoftwareParentCategory from '../../models/software/softwareParentCatModel.js';
import UserModel from '../../models/userModel.js';

// CREATE CATEGOROY
const createCategory = asyncHandler( async(req, res) => {
  const {    
    basicInfo,
    thumbnail,
    buyingGuide,
    featuredLinks,
    faqs,
    user,
  } = req.body;

  const {name } = req.body.basicInfo;

  let slug = slugify(name).toLowerCase() || "null"

  const product = await SoftwareParentCategory.findOne({'slug': slug})
  if(product?.slug === slug) {
    return res.status(404).json({error: "Category slug is already exist!"})
  }

  const createCat = await SoftwareParentCategory.create({
    basicInfo,
    thumbnail,
    buyingGuide,
    featuredLinks,
    faqs,
    slug,
    user,
  })

  await UserModel.updateOne({
    _id: req.body.id
  }, {
    $push: {
      SoftwareParentCategory: createCat._id
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
  const category = await SoftwareParentCategory.findById(req.params.id)
  const deleteCategory = category.remove()

  if(deleteCategory) {
    res.status(200).json({msg: "Category deleted successfully!"})
  } else {
    res.status(404).json({msg: "Category not found"})
  }
})

// ALL CATEGORIES
const allCategories = asyncHandler(async(req, res) => {
  const category = await SoftwareParentCategory.find({})
  .sort({createdAt: 'desc'})
  .populate('subCategories')

  if(category) {
    res.status(200).json(category)
  } else {
    res.status(400).json("Category not found!")
  }

})

// GET SINGLE CATEGORY 
const singleCategory = asyncHandler( async( req, res) => {
  const category = await SoftwareParentCategory.findOne({slug: req.params.slug})

  if(!category) {
    return res.status(404).json({msg: "category not found"})
  }

  res.json(category);

})

// UPDATE CATEGORY
const updateCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const updatedCategory = await SoftwareParentCategory.findOneAndUpdate(
      { slug },
      { $set: req.body },
      { new: true }
    );

    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ msg: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// delete all software
const deleteAllSoftwareCategoriesController = async (req, res) => {
  try {
    // Delete all documents in the collection
    const result = await SoftwareParentCategory.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} documents deleted.` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting documents.' });
  }
};


export {
  allCategories, createCategory, deleteAllSoftwareCategoriesController, deleteCategory, singleCategory,
  updateCategory
};

