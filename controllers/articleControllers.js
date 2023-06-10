import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import Article from '../models/articleModel.js';
import Category from '../models/softwareCategoryModel.js';
import SoftwareModel from '../models/softwareModel.js';

// CREATE POST
const createArticleController = asyncHandler(async(req, res) => {
  const {en, bn, common, user, tags, author, thumb, categories, doctorList} = req.body;
  
  let enSlug = slugify(en?.basicInfo?.title).toLowerCase();
  let bnSlug = slugify(en?.basicInfo?.title).toLowerCase() + "-bn";

    const newsCreate = await Article.create({
      en, bn, common, user, tags, author, thumb, categories, doctorList, enSlug, bnSlug 
      // user: req.user._id
    })

    await Category.updateMany({
      _id: categories
    }, {
      $push: {
        categoryNews: newsCreate._id
      }
    }, {"multi": true})

    // push article in doctor
    await SoftwareModel.updateOne({
      _id: newsCreate.author
    }, {
      $push: {
        articles: newsCreate._id
      }
    })
    
    if(newsCreate) {
      res.status(201).json({
        _id: newsCreate._id,
        en: newsCreate.en,
        bn: newsCreate.bn,
        common: newsCreate.common,
        user: newsCreate.user,
        author: newsCreate.author,
        thumb: newsCreate.thumb,
        description: newsCreate.description,
        tags: newsCreate.tags,
        doctorList: newsCreate.doctorList,
        categories: newsCreate.categories,
        enSlug: slugify(en?.basicInfo?.title).toLowerCase(),
        bnSlug: slugify(en?.basicInfo?.title).toLowerCase() + "-bn"
      })
      
    } else {
      res.status(400).json({msg: "Article created faield"})
    }

})

// EDIT NEWS
const updateArticleController = asyncHandler(async(req, res) => {
  try {
    const news = await Article.findOne({slug: req.params.slug})

    if (news) {
      const updateNews = await Article.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateNews)
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(404)
      throw new Error('article not found')
  }
})

// GET SINGLE NEWS
const detailsArticleController = asyncHandler(async(req, res) => {

    Article.findOne({ slug: req.params.slug })
        .populate('categories', 'enName bnName enSlug bnSlug')
        .populate('author', 'en bn degree enSlug bnSlug')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: "Article fetching failed!"
                });
            }
            res.json(data);
        });
})

// ALL NEWS LIST
const allArticleController = asyncHandler( async( req, res) => {
  const users = await Article.find({}).populate('categories', 'name slug').populate('user', 'name slug').sort({createdAt: 'desc'})
  if(users) {
    res.status(200).json(users)
  } else {
    res.status(404).json({msg: "News not found"})
  }
})

// DELETE POST
const deleteArticleController = asyncHandler(async(req, res) => {
  const news = Article.findById(req.params.id)
  if(!news) {
    res.status(404)
    throw new Error("News not found")
  } else {
    const deleteNews = await Article.remove()
    if(deleteNews) {
      res.status(200).json({message: "Article deleted!"})
    } else {
      res.status(500)
      throw new Error("Article delete error! server side error!")
    }
  }
})

// DELETE POST
const deleteAllArticleController = asyncHandler(async(req, res) => {
  const articles = Article.find({})
  if(!articles) {
    res.status(404)
    throw new Error("articles not found")
  } else {
    const deletearticles = await Article.remove()
    if(deletearticles) {
      res.status(200).json({message: "articles deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createArticleController,
  deleteArticleController,
  updateArticleController,
  detailsArticleController,
  deleteAllArticleController,
  allArticleController
};

