import express from 'express';
import { allLocations, createLocation, deleteAll, deleteLocation, getStateLocation, singleLocation, updateLocation } from '../controllers/locationController.js';
const router = express.Router()

router.post('/', createLocation)
router.delete('/', deleteAll)
router.delete('/:id', deleteLocation)
router.get('/', allLocations) // GET ALL Location
router.get('/:slug', singleLocation) // GET SINGLE Location
router.put('/:slug', updateLocation)
router.get('/state/:slug', getStateLocation)

export default router; 