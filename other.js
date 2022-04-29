import OtherServices from './otherController'
const express = require('express')
const router = express.Router()

router.post('/upload', OtherServices.uploadImage)
router.post('/uploadFile', OtherServices.uploadFile)
router.post('/upload/scale', OtherServices.upLoadAndScale)
router.post('/genChart', OtherServices.generateChartImage)

module.exports = router
