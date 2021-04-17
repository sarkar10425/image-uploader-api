const express = require("express")
const app = express()
const port = process.env.PORT || 8081
require("dotenv").config()
const cors = require('cors')
const getImage = require('./routes/getImage')
const postImage = require('./routes/postImage')
const morgan = require('morgan')

// connect db
const mongoose = require("mongoose")
mongoose.connect(process.env.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB Connected'))

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`)
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
)

app.use('/', getImage)
app.use('/', postImage)


app.listen(port, () => {
  console.log(`Uploader api listening at http://localhost:${port}`)
})



