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
        name,
        oneLineIntro,
        excerpt,
        description,
        flag,
        thumbnail,
        hightlight,
        table,
        suggestLinks,
        buyingGuide,
        articles,
        softwares, 
      } = req.body;

      // create slug
      const slug = slugify(name).toLowerCase() || null;

      // Check if name, _id, or slug already exists
      const existingLocation = await Model.findOne({
        $or: [{ name }, { slug: slugify(name).toLowerCase() }],
      });

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
        name,
        oneLineIntro,
        excerpt,
        description,
        flag,
        thumbnail,
        hightlight,
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
        name,
        oneLineIntro,
        excerpt,
        description,
        flag,
        thumbnail,
        hightlight,
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
          name,
          oneLineIntro,
          excerpt,
          description,
          flag,
          thumbnail,
          hightlight,
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

  // Controller to get all documents
  const getAll = async (req, res) => {
    try {
      // Find all documents
      const documents = await Model.find({}).sort({'createdAt': -1}).populate('subCategories');

      res.json(documents);
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

  // Return an object with the controller functions
  return {
    create,
    update,
    getSingle,
    getAll,
    deleteSingle,
    deleteAll,
  };

};

export default createCategoryController;