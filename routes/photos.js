import express from 'express'
import { create, edit, deletee, user, file } from '../controllers/photos.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/user/:user', user)
router.get('/file/:file', file)

export default router
