import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import PageModel from '../models/pageModel.js';

// CREATE Page
const createPageController = asyncHandler(async(req, res) => {
  const {name, excerpt, description, status, thumb, user} = req.body;
  
  let slug = slugify(name).toLowerCase() || null

    const PageCreate = await PageModel.create({ name, excerpt, description, status, thumb, user, slug })
    
    if(PageCreate) {
      res.status(201).json({
        _id: PageCreate._id,
        name: PageCreate.name,
        excerpt: PageCreate.excerpt,
        description: PageCreate.description,
        thumb: PageCreate.thumb,
        status: PageCreate.status,
        user: PageCreate.user,
        slug: PageCreate.slug,
      })
      
    } else {
      res.status(400).json({message: "Page created faield"})
    }

})

// EDIT Page
const updatePageController = asyncHandler(async(req, res) => {
  const doctorEnSlug = req.params.slug;
    const doctorState = req.body;

    const query = {
      slug: doctorEnSlug,
    };

    const update = {
      $set: doctorState,
    };

    const result = await PageModel.updateOne(query, update);

    if (result.matchedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Page updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error updating page",
      });
    }
})

// GET SINGLE Page
const detailsPageController = asyncHandler(async(req, res) => {
    await PageModel.findOne({slug: req.params.slug})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: {msg: "Page not found"}
                });
            }
            return res.json(data);
        });
})

// ALL Page LIST
const allPageController = asyncHandler( async( req, res) => {
  const pages = await PageModel.find({})
  .populate('user')
  .sort({createdAt: 'desc'})
  if(pages) {
    res.status(200).json(pages)
  } else {
    res.status(404).json({msg: "No Page found!"})
  }
})

// DELETE Page
const deletePageController = asyncHandler(async(req, res) => {
  const bloodDonr = await PageModel.findById(req.params.id)
  if(!bloodDonr) {
    res.status(404)
    throw new Error("Page not found")
  } else {
    const deletedbloodDonr = await bloodDonr.remove()
    if(deletedbloodDonr) {
      res.status(200).json({message: "Page deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  allPageController, createPageController,
  deletePageController, detailsPageController, updatePageController
};

