import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import News from '../models/articleModel.js';
import Category from '../models/softwareCategoryModel.js';
import SoftwareCategory from '../models/softwareCategoryModel.js';


function createSubCategory (createCat, parentId = null) {
  const categories = []
  let category;

  if(parentId == null) {
    category = createCat.filter(cat => cat.parentId == undefined)
  } else {
    category = createCat.filter(cat => cat.parentId == parentId)
  }

  for(let cat of category) {
    categories.push({
      _id: cat._id,
      name: cat.name, 
      oneLineIntro: cat.oneLineIntro, 
      excerpt: cat.excerpt, 
      description: cat.description,
      thumbnail: cat.thumbnail,
      buyingGuide: cat.buyingGuide,
      featuredLinks: cat.featuredLinks,
      parentId: cat.parentId,
      createdAt: cat.createdAt,
      articles: cat.articles,
      children: createSubCategory(createCat, cat._id),
    })
  }

  return categories; 

}


// CREATE CATEGOROY
const createCategory = asyncHandler( async(req, res) => {
  const {    
    name,
    oneLineIntro,
    excerpt,
    description,
    thumbnail,
    buyingGuide,
    featuredLinks,
    parentId
  } = req.body;

  let slug = slugify(name).toLowerCase() || "null"

  const product = await Category.findOne({'slug': slug})
  if(product?.slug === slug) {
    return res.status(404).json({error: "Category slug is already exist!"})
  }

  const createCat = await Category.create({
    name,
    oneLineIntro,
    excerpt,
    description,
    thumbnail,
    buyingGuide,
    featuredLinks,
    slug,
    parentId
  })
  if(createCat) {
    res.status(201).json(createCat)
  } else {
    res.status(400).json({msg: "Software category create failed!"})
  }
})

// DELETE CATEGORY
const deleteCategory = asyncHandler(async(req, res) => {
  const category = await Category.findById(req.params.id)
  const deleteCategory = category.remove()

  if(deleteCategory) {
    res.status(200).json({msg: "Category deleted successfully!"})
  } else {
    res.status(404).json({msg: "Category not found"})
  }
})

// ALL CATEGORIES
const allCategories = asyncHandler(async(req, res) => {
  const category = await Category.find({})

  const categoryList = createSubCategory(category)

  if(category) {
    res.status(200).json(categoryList)
  } else {
    res.status(400).json("Category not found!")
  }

})

// GET SINGLE CATEGORY 
const singleCategory = asyncHandler( async( req, res) => {
  const category = await Category.findOne({slug: req.params.slug})

  if(!category) {
    return res.status(404).json({msg: "category not found"})
  }

  const createNews = await News.find({ categories: category })
  .populate('categories')
  .select('_id title excerpt categories thumb postedBy createdAt updatedAt')

  res.json({ category: category, news: createNews });

})

// UPDATE CATEGORY
const updateCategory = asyncHandler( async (req, res) => {
  const category = await Category.findById(req.params.id)
  
  if(category) {
    const updateCat = await Category.findByIdAndUpdate(req.params.id, {
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
    const result = await Category.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} documents deleted.` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting documents.' });
  }
};


export {
  createCategory,
  deleteCategory,
  allCategories,
  singleCategory,
  updateCategory,
  deleteAllSoftwareCategoriesController
};

