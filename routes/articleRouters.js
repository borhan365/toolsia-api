import express from 'express'
import { allArticleController, createArticleController, deleteAllArticleController, deleteArticleController, detailsArticleController, updateArticleController } from '../controllers/articleControllers.js'
const router = express.Router()

router.post('/', createArticleController)
router.delete('/:id', deleteArticleController)
router.delete('/delete-all', deleteAllArticleController)
router.put('/:slug', updateArticleController)
router.get('/', allArticleController)
router.get('/:slug', detailsArticleController)


export default router;