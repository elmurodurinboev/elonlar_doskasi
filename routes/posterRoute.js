const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  getAddPoster,
  addPoster,
  getOnePoster,
  getPosterEditPage,
  updatePosterById
} = require("../controllers/posterController");

router.get("/", getPostersPage);

router.get("/add", getAddPoster);
router.post("/add", addPoster);
router.get("/:id", getOnePoster);
router.get("/:id/edit", getPosterEditPage);
router.post("/:id/edit", updatePosterById);

module.exports = router;
