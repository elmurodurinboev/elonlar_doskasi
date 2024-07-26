const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  getAddPoster,
  addPoster,
  getOnePoster,
} = require("../controllers/posterController");

router.get("/", getPostersPage);

router.get("/add", getAddPoster);
router.post("/add", addPoster);
router.get("/:id", getOnePoster);

module.exports = router;
