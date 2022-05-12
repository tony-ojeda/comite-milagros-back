const { Router } = require('express')
const multer = require('multer')
const { uploadHandler,uploadMultipleFileHandler } = require('./upload.controller')

const router = Router()
const upload = multer({ dest: './temp' })

router.post('/file', 
  upload.single('singleFile'), 
  uploadHandler
)

router.post('/files', 
  upload.array('singleFile'), 
  uploadMultipleFileHandler
)

module.exports = router
