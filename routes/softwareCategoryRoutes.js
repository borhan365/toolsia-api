import express from 'express';
import { allCategories, createCategory, deleteAllSoftwareCategoriesController, deleteCategory, singleCategory, updateCategory } from '../controllers/softwareCategoryController.js';
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'

router.post('/', createCategory)
router.get('/', allCategories) // GET ALL CATEGORY
router.get('/:slug', singleCategory) // GET SINGLE CATEGORY
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.delete('/', deleteAllSoftwareCategoriesController)

export default router; 