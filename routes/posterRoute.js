const { Router } = require("express")
const router = Router()

router.get("/", (req, res) => {
  res.render("posters", {
    title: "Posters Page"
  })
})

module.exports = router