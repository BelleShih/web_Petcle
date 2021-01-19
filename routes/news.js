import express from 'express'
import { create, getNews, getNew, delNew, editNew, file } from '../controllers/news.js'

const router = express.Router()

// 新增消息
router.post('/', create)
// 查詢全部消息
router.get('/', getNews)
// 抓指定消息
router.get('/:id', getNew)
// 刪除指定消息
router.delete('/:id', delNew)
// // 編輯指定消息
router.patch('/:id', editNew)
// 抓指定消息圖片
router.get('/file/:file', file)

export default router