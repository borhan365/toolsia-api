import express from 'express';
import createSubCategoryController from '../../controllers/categories/subCategoryController.js';
import createChildCategoryController from '../../controllers/categories/childCategoryController.js';

const router = express.Router();

// Models
const SoftwareController = createChildCategoryController('SoftwareChildCategory');

// Language Routes
router.post('/software', SoftwareController.create);
router.put('/software/:slug', SoftwareController.update);
router.get('/software/:slug', SoftwareController.getSingle);
router.get('/software', SoftwareController.getAll);
router.delete('/software/:slug', SoftwareController.deleteSingle);
router.delete('/software', SoftwareController.deleteAll);

export default router;
