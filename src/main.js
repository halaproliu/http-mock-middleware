const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const Mock = require('mockjs')

const getMockData = (url) => {
  let data
  let result
  // remove requrie cache to support dynamic reload
  delete require.cache[require.resolve(url)]
  data = require(url)
  if (typeof data === 'function') {
    result = data(req, res)
  } else {
    result = data
  }
  result = Mock.mock(result)
  return result
}

module.exports = async (req, res, next) => {
  let reqUrl = req.url.split('?')[0]
  let method = req.method.toLowerCase()
  let basePath = path.join(cwd, 'mock')
  let apiJsPath = path.join(basePath, method, reqUrl + '.js')
  let apiJsonPath = path.join(basePath, method, reqUrl + '.json')
  if (fs.existsSync(apiJsPath)) {
    let result = getMockData(apiJsPath)
    res.json(result)
  } else if (fs.existsSync(apiJsonPath)) {
    let result = getMockData(apiJsonPath)
    res.json(result)
  } else {
    next()
  }
}