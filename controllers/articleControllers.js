import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import Article from '../models/articleModel.js';

// CREATE ARTICLE
// CREATE ARTICLE
const createArticleController = asyncHandler(async (req, res) => {
  const { basicInfo, common, user, author, thumb, categories, faqs, doctorList } = req.body;

  // Check if basicInfo.title or basicInfo.slug already exist in the database
  // const existingArticle = await Article.findOne({
  //   'basicInfo.title': basicInfo.title,
  // });
  

  // if (existingArticle) {
  //   res.status(400);
  //   throw new Error('An article with the same title or slug already exists');
  // }

  // Make basicInfo.title required
  // if (!basicInfo.title) {
  //   res.status(400);
  //   throw new Error('Title is required');
  // } 
  // if(!common?.postStatus) {
  //   res.status(400);
  //   throw new Error('Post Status is required');
  // } 

  const slug = slugify(basicInfo.title).toLowerCase() || null;

  const article = await Article.create({
    basicInfo,
    common,
    user,
    author,
    thumb,
    categories,
    faqs,
    doctorList,
    slug,
  });

  res.status(201).json(article);
});

// DELETE ARTICLE
const deleteArticleController = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  await article.remove();
  res.json({ message: 'Article deleted' });
});

// UPDATE ARTICLE
const updateArticleController = asyncHandler(async (req, res) => {
  // const article = await Article.findOne({ slug: req.params.slug });
  // if (!article) {
  //   res.status(404);
  //   throw new Error('Article not found');
  // }

  // article.basicInfo = req.body.basicInfo || article.basicInfo;
  // article.common = req.body.common || article.common;
  // article.slug = req.body.slug || article.slug;
  // article.categories = req.body.categories || article.categories;
  // article.faqs = req.body.faqs || article.faqs;
  // article.user = req.body.user || article.user;
  // article.author = req.body.author || article.author;
  // article.thumb = req.body.thumb || article.thumb;
  // article.doctorList = req.body.doctorList || article.doctorList;

  // const updatedArticle = await article.save();
  // res.json(updatedArticle);

  const DoctorType = await Article.find({slug: req.params.slug})
  
  if(DoctorType) {
    const updateDoctorType = await Article.findByIdAndUpdate(req.params.slug, {
      $set: req.body,
    }, {new: true})
    res.status(200).json(updateDoctorType)
  } else {
    res.status(404).json({msg: "Article update failed!"})
  }
});

// GET SINGLE ARTICLE
const detailsArticleController = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })

  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// DELETE ALL ARTICLES
const deleteAllArticleController = asyncHandler(async (req, res) => {
  await Article.deleteMany({});
  res.json({ message: 'All articles deleted' });
});

// GET ALL ARTICLES
const allArticleController = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
    // .populate('categories', 'name slug')
    // .populate('user', 'name slug')
    .sort({ createdAt: 'desc' });

  if (articles.length === 0) {
    res.status(404);
    throw new Error('No articles found. Please insert new ones.');
  }

  res.json(articles);
});



export {
  allArticleController, createArticleController, deleteAllArticleController, deleteArticleController, detailsArticleController, updateArticleController
};

