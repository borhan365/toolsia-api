import createCommonModel from '../../models/commons/commonModel.js';

// Function to create a reusable controller
const createCommonController = (modelName) => {
  const Model = createCommonModel(modelName);

  // Controller to create a new document
  const create = async (req, res) => {
    try {
      // Get only the name field from req.body
      const { name } = req.body;

      // check is name is blank or filled
      if(!name) {
        return res.status(401).json({message: "Name not be empty!"})
      }

      // Validate name field (Add your own validation logic here)

      // Create a new document
      const newDocument = await Model.create({ name });

      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  // Controller to update an existing document
  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Validate name field (Add your own validation logic here)

      // Update the document
      const updatedDocument = await Model.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  // Controller to get a single document
  const getSingle = async (req, res) => {
    try {
      const { id } = req.params;

      // Find the document by ID
      const document = await Model.findById(id);

      if (!document) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json(document);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  // Controller to get all documents
  const getAll = async (req, res) => {
    try {
      // Find all documents
      const documents = await Model.find().sort({'createdAt': -1});

      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  // Controller to delete a single document
  const deleteSingle = async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the document by ID
      const deletedDocument = await Model.findByIdAndDelete(id);

      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found.' });
      }

      res.json({ message: 'Document deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  // Controller to delete all documents
  const deleteAll = async (req, res) => {
    try {
      // Delete all documents
      await Model.deleteMany();

      res.json({ message: 'All documents deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
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

export default createCommonController;
