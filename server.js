const express = require("express")
const path = require("path")
const dotenv = require('dotenv')
const exphbs = require("express-handlebars")

dotenv.config()

const app = express()
app.use(express.static(path.join(__dirname, "public")))

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')


app.get("/", (req, res) => {
  res.render("home")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))