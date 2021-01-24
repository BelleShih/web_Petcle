const Dotenv = require('dotenv')
const parsedEnv = Dotenv.config().parsed

module.exports = function () {
  return parsedEnv
}