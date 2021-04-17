const express = require('express')
const { postImage } = require('../controllers/postImage')
const router = express.Router()

router.post("/upload", postImage);

module.exports = router