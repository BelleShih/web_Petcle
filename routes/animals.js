import express from 'express'
import { create, deletee, addBreeds, deleteBreeds, getAnimals, getAnimal, getBreeds, addBodyparts, deleteBodypart } from '../controllers/animals.js'

const router = express.Router()

router.post('/', create)
router.get('/', getAnimals)
router.patch('/:id', addBreeds)
router.delete('/:id', deletee)
router.get('/:id', getAnimal)
router.delete('/breeds/:id', deleteBreeds)
router.get('/breeds/:id', getBreeds)
router.patch('/bodypart/:id', addBodyparts)
router.delete('/bodypart/:id', deleteBodypart)

export default router
