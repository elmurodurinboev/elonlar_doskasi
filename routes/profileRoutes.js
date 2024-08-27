const { Router } = require("express");
const router = Router();
const {
  getProfilePage
} = require("../controllers/profileController");

const { protected } = require("../middleware/auth")

router.get("/:username", protected, getProfilePage);

module.exports = router;
