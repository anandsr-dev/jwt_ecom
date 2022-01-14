require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.authenticate = async (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({msg: 'Provide a token to access this route'})
      }
      const token = authHeader.split(' ')[1]
      try {
          console.log('token ', authHeader)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = decoded
        req.user = { email }
        next()
      } catch (error) {
        return res.status(401).json({msg: 'Unauthorized'})
      }
}