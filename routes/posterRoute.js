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
const { protected } = require("../middleware/auth")

router.get("/", getPostersPage);


router.get("/add", protected, getAddPoster);
router.post("/add", protected, upload.single('image'), addPoster);
router.get("/:id", protected, getOnePoster);
router.get("/:id/edit", protected, getPosterEditPage);
router.post("/:id/edit", protected, updatePosterById);
router.post("/:id/delete", protected, deletePoster);
module.exports = router;
