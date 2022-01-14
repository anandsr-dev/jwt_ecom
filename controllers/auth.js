const User = require('../models/user')
const Token = require('../models/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user)
        return res.send("User already exists")

    try {
        const hash = await bcrypt.hash(password, 10)
        const user = { email, password: hash }
        await new User(user).save()
        res.status(201).send('Created')
    } catch (error) {
        res.status(500).send(error.message)
    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {

        try {
            if (await bcrypt.compare(password, user.password)) {
                // const existing_user = await Token.findOne({ email })
                // if (existing_user) return res.status(401).json({ msg: 'token already exist for this user' })
                const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                    expiresIn: '3d',
                })

                // await new Token({ email, token }).save()
                // console.log(token)

                res.status(200).json({ msg: 'token created for user', token })
            }
            else {
                res.status(401).json({ msg: 'invalid password' })
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}