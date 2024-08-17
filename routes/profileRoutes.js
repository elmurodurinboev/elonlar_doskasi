const { Router } = require("express");
const router = Router();
const {
  getProfilePage
} = require("../controllers/profileController");

router.get("/:username", getProfilePage);

module.exports = router;
