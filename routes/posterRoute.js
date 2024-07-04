const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  getAddPoster,
  addPoster,
} = require("../controllers/posterController");

router.get("/", getPostersPage);

router.get("/add", getAddPoster);
router.post("/add", addPoster);

module.exports = router;
