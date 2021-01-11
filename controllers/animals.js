import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import util from 'util'
import animals from '../models/animals.js'

// 新增動物分類
export const create = async(req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  
  try {
    if (req.body.animals === null) {
      res.status(400).send({ success: false, message: '請輸入動物種類' })
    } else if (req.body.breeds === null) {
      res.status(400).send({ success: false, message: '請輸入動物品種' })
    }
    console.log(req.body)
    const result = await animals.create({
      name: req.body.animals,
      breeds: [
        {
          name: req.body.breeds
        }
      ],
      bodypart: [
        {
          name: req.body.bodypart
        }
      ]
    })
      res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 編輯
export const edit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await animals.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料'})
    } else {
      result = await animals.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

// 刪除
export const deletee = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (result === null) {
    res.status(404).send({ success: false, message: '找不到資料' })
  } else {
    result = await animals.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  }
}

// 新增動物品種
export const addBreeds = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    animals.findByIdAndUpdate(req.params.id,
      {
        $push: {
          breeds: {
            name: req.body.breeds
          }
        }
      },
      {new: true}
    ).then(result => {
      res.status(200).send({ success: true, message: '', result })
      console.log(util.inspect(result, {showHidden: true, depth: null}))
    }).catch(error => {
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

// 刪除動物品種
export const deleteBreeds = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    animals.findOneAndUpdate(
      {'breeds._id': req.params.id},
      {
        $pull: {
          breeds: {
            _id: req.params.id
          }
        }
      },
      {new: true}
  ).then(result => {
      res.status(200).send({ success: true, message: '', result })
      console.log(util.inspect(result, {showHidden: true, depth: null}))
    }).catch(error => {
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

// 增加動物部位
export const addBodyparts = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    animals.findByIdAndUpdate(req.params.id,
      {
        $push: {
          bodypart: {
            name: req.body.bodyparts
          }
        }
      },
      {new: true}
    ).then(result => {
      res.status(200).send({ success: true, message: '', result })
      console.log(util.inspect(result, {showHidden: true, depth: null}))
    }).catch(error => {
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

// 刪除動物部位
export const deleteBodypart = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    animals.findOneAndUpdate(
      {'bodypart._id': req.params.id},
      {
        $pull: {
          bodypart: {
            _id: req.params.id
          }
        }
      },
      {new: true}
  ).then(result => {
      res.status(200).send({ success: true, message: '', result })
      console.log(util.inspect(result, {showHidden: true, depth: null}))
    }).catch(error => {
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

//抓全部animals的資料
export const getAnimals = async (req, res) => {
  animals.find().then(result => {
  res.status(200).send({ success: true, message: '', result })
  console.log(util.inspect(result, {showHidden: true, depth: null}))
}).catch(error => {
  console.log(error)
})
}

//尋找指定動物
export const getAnimal = async (req, res) => {
  animals.findById( req.params.id ).populate('animals.name')
.then(result => {
  res.status(200).send({ success: true, message: '', result })
  console.log(util.inspect(result, {showHidden: true, depth: null}))
}).catch(error => {
  console.log(error)
})
}

// 尋找動物品種
export const getBreeds = async (req, res) => {
  animals.findById( req.params.id, 'breeds' ).populate('breeds.p_id')
.then(result => {
  res.status(200).send({ success: true, message: '', result })
  console.log(util.inspect(result, {showHidden: true, depth: null}))
}).catch(error => {
  console.log(error)
})
}

