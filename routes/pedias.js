import express from 'express'
import { create, getPedias, getPedia, delPedia, editPedia, file } from '../controllers/pedias.js'

const router = express.Router()

// 新增文章
router.post('/', create)
// 查詢全部文章
router.get('/', getPedias)
// 抓指定文章
router.get('/:id', getPedia)
// 刪除指定文章
router.delete('/:id', delPedia)
// // 編輯指定文章
router.patch('/:id', editPedia)
// 抓指定文章圖片
router.get('/file/:file', file)

export default router