const { Router } = require("express")
const router = Router()
const { getHomePage } = require("../controllers/homeController")

router.get("/", getHomePage)

module.exports = router