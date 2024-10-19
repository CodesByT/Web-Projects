//

const CustomAPIError = require("../errors/custom-error")
const StatusCode = require("http-status-codes")
//
const jwt = require("jsonwebtoken")
const login = async (request, response) => {
  const { username, password } = request.body

  if (!username || !password) {
    throw new CustomAPIError("Please Provide email and password", 400)
  }
  const payload = new Date().getDate()
  const token = jwt.sign({ payload, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })

  response.status(200).json({ msg: "user_created", token })
}

const dashboard = async (request, response) => {
  const user = request.user
  const luckyNumber = Math.floor(Math.random() * 100)
  response.status(200).json({
    msg: `Hello ${user.username}`,
    secret: `Your lucky number ${luckyNumber}`,
  })
}

module.exports = { login, dashboard }
