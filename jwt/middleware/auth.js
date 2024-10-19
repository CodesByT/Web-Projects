//

//
const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")
const StatusCode = require("http-status-codes")

const authenticationMiddleware = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No Token", StatusCode.BAD_REQUEST)
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    request.user = { id, username }

    next()
  } catch (error) {
    throw new CustomAPIError(
      "Not authorized to access this route",
      StatusCode.UNAUTHORIZED
    )
  }
}

module.exports = authenticationMiddleware
