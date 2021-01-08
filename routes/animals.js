import express from 'express'
import { create, deletee, addBreeds, deleteBreeds } from '../controllers/animals.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', addBreeds)
router.delete('/:id', deletee)
router.delete('/breeds/:id', deleteBreeds)

export default router
