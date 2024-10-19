const CustomAPIError = require("../errors/custom-error")

//

const errorHandlerMiddleware = (error, request, response, next) => {
  if (error instanceof CustomAPIError) {
    return response.status(error.statusCode).json({ msg: error.message })
  }
  return response.status(500).send("Something went wrong try again later")
}

module.exports = errorHandlerMiddleware
