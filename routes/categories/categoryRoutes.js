import express from 'express';
import createCategoryController from '../../controllers/categories/categoryController.js';

const router = express.Router();

// Models
const SoftwareController = createCategoryController('SoftwareCategory');

// Language Routes
router.post('/software', SoftwareController.create);
router.put('/software/:slug', SoftwareController.update);
router.get('/software/:slug', SoftwareController.getSingle);
router.get('/software', SoftwareController.getAll);
router.delete('/software/:slug', SoftwareController.deleteSingle);
router.delete('/software', SoftwareController.deleteAll);

export default router;
