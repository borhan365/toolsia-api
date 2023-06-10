import express from "express";
import { allJobController, createJobController, deleteJobController, detailsJobController, updateJobController } from "../controllers/jobController.js";

const router = express.Router(); 

router.post('/', createJobController)
router.put('/slug', updateJobController)
router.delete('/', deleteJobController)
router.get('/slug', detailsJobController)
router.get('/', allJobController)


export default router; 