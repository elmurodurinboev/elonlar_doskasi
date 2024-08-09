const { Router } = require("express");
const router = Router();

const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
} = require("../controllers/authController");

router.get("/login", getLoginPage);
router.get("/signup", getRegisterPage);
router.post("/signup", registerNewUser);

module.exports = router;
