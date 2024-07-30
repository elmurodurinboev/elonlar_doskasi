const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  getAddPoster,
  addPoster,
  getOnePoster,
  getPosterEditPage,
  updatePosterById,
  deletePoster,
} = require("../controllers/posterController");
const upload = require("../utils/fileUpload")

router.get("/", getPostersPage);

router.get("/add", getAddPoster);
router.post("/add", upload.single('image'), addPoster);
router.get("/:id", getOnePoster);
router.get("/:id/edit", getPosterEditPage);
router.post("/:id/edit", updatePosterById);
router.post("/:id/delete", deletePoster);
module.exports = router;
