const path = require('path')
const catchAsync = require('../utils/catchAsync')

const publicPath = path.join(__dirname, '../public/')

exports.mainPage = catchAsync(async (req, res, next) => {
    res.sendFile(publicPath + '/' + 'index.html')
    console.log(publicPath + '/' + 'index.html')
    // next()
})

exports.notePage = catchAsync(async (req, res, next) => {
    res.sendFile(publicPath + '/' + 'notes.html')
    // next()
})