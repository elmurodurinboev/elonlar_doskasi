const { Router } = require("express");
const router = Router();

const {getLoginPage, getRegisterPage} = require("../controllers/authController")

router.get("/login", getLoginPage)
router.get("/signup", getRegisterPage)

module.exports = router
