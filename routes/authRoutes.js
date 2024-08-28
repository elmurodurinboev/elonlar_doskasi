const { Router } = require("express");
const router = Router();

const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout
} = require("../controllers/authController");

const { protected, guest } = require("../middleware/auth")

router.get("/login", guest, getLoginPage);
router.get("/signup", guest, getRegisterPage);
router.post("/signup", guest, registerNewUser);
router.post("/login", guest, loginUser);
router.get("/logout", protected, logout);

module.exports = router;
