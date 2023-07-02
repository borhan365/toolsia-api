import express from 'express';
import { allCategories, createCategory, deleteAllSoftwareCategoriesController, deleteCategory, singleCategory, updateCategory } from '../../controllers/software/softwareChildCatController.js';
const router = express.Router()

router.post('/', createCategory)
router.get('/', allCategories) // GET ALL CATEGORY
router.get('/:slug', singleCategory) // GET SINGLE CATEGORY
router.put('/:slug', updateCategory)
router.delete('/:id', deleteCategory)
router.delete('/', deleteAllSoftwareCategoriesController)

export default router; 