
const express = require('express')
const {readdirSync} = require ('fs')
const morgan = require ('morgan')
const cors = require ('cors')
const connectDB = require('./db/connectDB')
require('dotenv').config()


const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({extended:true}))
app.use(cors())

//routes
readdirSync('./routes').map((r) => app.use('/api',require('./routes/'+r)))

app.listen(process.env.PORT, async () => {
    await connectDB(process.env.MONGO_URI)
    console.log(`Server running at port ${process.env.PORT}`)
})