import express from 'express'
import { create, edit, deletee, user, file, getAll, animalsfunc } from '../controllers/photos.js'

const router = express.Router()

router.post('/', create)
router.get('/', getAll)
router.get('/animals/:_id', animalsfunc)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/user/:user', user)
router.get('/file/:file', file)

export default router
