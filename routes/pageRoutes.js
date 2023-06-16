import express from 'express';
import { allPageController, createPageController, deletePageController, detailsPageController, updatePageController } from '../controllers/pageController.js';

const router = express.Router()

router.post('/', createPageController)
router.get('/', allPageController)
router.get('/:slug', detailsPageController)
router.put('/:slug', updatePageController)
router.delete('/:id', deletePageController)

export default router;