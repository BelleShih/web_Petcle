import express from 'express'
import { create, editPet, delPet, getPets, getUserPet, getPet } from '../controllers/pets.js'
// 

const router = express.Router()

// 新增寵物
router.post('/', create)
// 修改寵物
router.patch('/:id', editPet)
// 刪除寵物
router.delete('/:id', delPet)
// 取得所有寵物
router.get('/', getPets)
// 取得使用者的寵物
router.get('/user/:id', getUserPet)
// 取得指定寵物
router.get('/:id', getPet)

export default router
