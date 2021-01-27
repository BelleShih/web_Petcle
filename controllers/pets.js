import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import util from 'util'

import pets from '../models/pets.js'

let storage

dotenv.config()

if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'images/')
    },
    filename(req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    destination(req, file, options, callback) {
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

export const create = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  upload.single('file')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        console.log(error)
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }
        const result = await pets.create({
          file,
          user: req.session.user._id,
          name: req.body.name,
          animal: req.body.animal,
          breed: req.body.breed,
          description: req.body.description,
          mails: []
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          console.log(error)
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}

// 編輯寵物
export const editPet = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  upload.single('file')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        console.log(error)
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      console.log(eror)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      let result = await pets.findById(req.params.id)
      if (result === null) {
        res.status(404).send({ success: false, message: '找不到資料' })
      } else {
        try {
          if (req.file) {
            let file = ''
            if (process.env.DEV === 'true') {
              file = req.file.filename
            } else {
              file = path.basename(req.file.path)
            }
            req.body.file = file
          } else {
            req.body.file = result.file
          }
          result = await pets.findByIdAndUpdate(req.params.id, req.body, { new: true })
          res.status(200).send({ success: true, message: '', result })
        } catch (error) {
          if (error.name === 'ValidationError') {
            const key = Object.keys(error.errors)[0]
            const message = error.errors[key].message
            res.status(400).send({ success: false, message })
          } else {
            console.log(error)
            res.status(500).send({ success: false, message: '伺服器錯誤' })
          }
        }
      }
    }
  })
}

// 刪除寵物
export const delPet = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    let result = await pets.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (result.user.toString() !== req.session.user._id.toString()) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await pets.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 取得所有寵物
export const getPets = async (req, res) => {
  try {
    const result = await pets.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 取得使用者的寵物
export const getUserPet = async (req, res) => {
  try {
    const result = await pets.find({ user: req.params.id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 取得指定寵物
export const getPet = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    const result = await pets.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 取得寵物圖片
export const getPetFile = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    })
      .then(ress => {
        ress.data.pipe(res)
      })
      .catch(error => {
        res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
      })
  }
}

// 更換寵物圖片
export const changePetFile = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  upload.single('file')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        console.log(error)
        message = '上傳錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      let file = ''
      if (process.env.DEV === 'true') {
        file = req.file.filename
      } else {
        file = path.basename(req.file.path)
      }
      try {
        let result = await pets.findById(req.params.id)
        if (result === null) {
          res.status(404).send({ success: false, message: '找不到資料' })
        } else if (result.user.toString() !== req.session.user._id.toString()) {
          res.status(403).send({ success: false, message: '沒有權限' })
        } else {
          result = await pets.findByIdAndUpdate(req.params.id, req.body, { new: true })
          res.status(200).send({ success: true, message: '', result })
        }
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else if (error.name === 'CastError') {
          res.status(400).send({ success: false, message: 'ID 格式錯誤' })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}

export const sendMail = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    pets
      .findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            mails: {
              sendUser: req.session.user.name,
              uid: req.session.user._id,
              title: req.body.title,
              description: req.body.description,
              date: Date.now()
            }
          }
        },
        { new: true }
      )
      .then(result => {
        res.status(200).send({ success: true, message: '', result })
      })
      .catch(error => {
        console.log(error)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
