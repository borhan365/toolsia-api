import slugify from 'slugify';
import createCategoryModel from '../../models/categories/categoryModel.js';

// Function to create a reusable controller
const createCategoryController = (modelName) => {
  const Model = createCategoryModel(modelName);

  // Controller to create a new document
  const create = async (req, res) => {
    try {
      // Get field from req.body
      const { 
        basicInfo,
        thumbnail,
        table,
        suggestLinks,
        buyingGuide,
        articles,
        softwares, 
      } = req.body;

      const { name } = req.body.basicInfo;

      // create slug
      const slug = slugify(name).toLowerCase() || null;

      // Check if name, _id, or slug already exists
      const existingLocation = await Model.findOne({ slug: slugify(name).toLowerCase() });

      if (existingLocation) {
        res.status(400).json({ message: 'Document with the same name or slug already exists' });
        return;
      }

      // check is name is blank or filled
      if(!name) {
        return res.status(401).json({message: "Name not be empty!"})
      }

      // Validate name field (Add your own validation logic here)

      // Create a new document
      const newDocument = await Model.create({ 
        basicInfo,
        thumbnail,
        table,  
        suggestLinks,
        buyingGuide,
        articles,
        softwares,
        slug 
      });

      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // Controller to update an existing document
  const update = async (req, res) => {
    try {
      const { slug } = req.params;
      const {         
        basicInfo,
        thumbnail,
        table,
        suggestLinks,
        buyingGuide,
        articles,
        softwares
       } = req.body;

      // Validate name field (Add your own validation logic here)

      // Update the document
      const updatedDocument = await Model.findOneAndUpdate(
        slug,
        { 
          basicInfo,
          thumbnail,
          table,
          suggestLinks,
          buyingGuide,
          articles,
          softwares
         },
        { new: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // Controller to get a single document
  const getSingle = async (req, res) => {
    try {
      const { slug } = req.params;

      // Find the document by ID
      const document = await Model.findOne({slug: slug});

      if (!document) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json(document);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // Get all names
  const getAllCategoryNames = async (req, res) => {
    try {
      const result = await Model.aggregate([
        {
          $lookup: {
            from: "softwaresubcategories",
            localField: "_id",
            foreignField: "parentCategory",
            as: "subCategories"
          }
        },
        {
          $unwind: "$subCategories"
        },
        {
          $lookup: {
            from: "softwarechildcategories",
            localField: "subCategories._id",
            foreignField: "parentCategory",
            as: "subCategories.childCategories"
          }
        },
        {
          $group: {
            _id: {
              categoryId: "$_id",
              basicInfo: "$basicInfo",
              categorySlug: "$slug",
              subCategory: {
                _id: "$subCategories._id",
                basicInfo: "$subCategories.basicInfo",
                slug: "$subCategories.slug"
              }
            },
            childCategories: {
              $push: {
                $map: {
                  input: "$subCategories.childCategories",
                  as: "childCategory",
                  in: {
                    _id: "$$childCategory._id",
                    basicInfo: "$$childCategory.basicInfo",
                    slug: "$$childCategory.slug"
                  }
                }
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id.categoryId",
            basicInfo: { $first: "$_id.basicInfo" },
            categorySlug: { $first: "$_id.categorySlug" },
            subCategories: {
              $push: {
                _id: "$_id.subCategory._id",
                basicInfo: "$_id.subCategory.basicInfo",
                slug: "$_id.subCategory.slug",
                childCategories: {
                  $reduce: {
                    input: "$childCategories",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] }
                  }
                }
              }
            }
          }
        }
      ]);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };
  
  
  
  
  // Controller to get all documents
  const getAll = async (req, res) => {
    try {
    const result = await Model.aggregate([
        {
          $lookup: {
            from: "softwaresubcategories",
            localField: "_id",
            foreignField: "parentCategory",
            as: "subCategories"
          }
        },
        {
          $unwind: "$subCategories"
        },
        {
          $lookup: {
            from: "softwarechildcategories",
            localField: "subCategories._id",
            foreignField: "parentCategory",
            as: "subCategories.childCategories"
          }
        },
        {
          $group: {
            _id: "$_id",
            basicInfo: { $first: "$basicInfo" }, 
            thumbnail: { $first: "$thumbnail" },
            buyingGuide: { $first: "$buyingGuide" },
            articles: { $first: "$articles" },
            softwares: { $first: "$softwares" },
            slug: { $first: "$slug" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            __v: { $first: "$__v" },
            subCategories: { $push: "$subCategories" }
          }
        }
      ]);
      
      const documents = await Model.find({}).sort({'createdAt': -1}).populate('subCategories');

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // Controller to delete a single document
  const deleteSingle = async (req, res) => {
    try {
      const { slug } = req.params;

      // Delete the document by ID
      const deletedDocument = await Model.findOneAndDelete({slug});

      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json({ message: 'Document deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // Controller to delete all documents
  const deleteAll = async (req, res) => {
    try {
      // Delete all documents
      await Model.deleteMany();

      res.json({ message: 'All documents deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: `Something went wrong. ${error}` });
    }
  };

  // list of category
  const categoryLists = async (req, res) => {
    const categories = await Model.find(); 
    try {
      if(categories) {
        res.status(200).json(categories)
      } else {
        res.status(404).json({message: "Categories not found!"})
      }
    } catch (error) {
      res.status(404).json({message: `Categoires not found ${error}`})
    }
  }

  // Return an object with the controller functions
  return {
    create,
    update,
    getSingle,
    getAll,
    getAllCategoryNames,
    deleteSingle,
    deleteAll,
    categoryLists,
  };

};

export default createCategoryController;
