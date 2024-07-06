const fs = require("fs")
const path = require("path")

const addNewPosterToDb = async (poster) => {
  const data = () => fs.readFile(path.join(__dirname, "db.json"), "utf8")
  const poster = JSON.parse(data())
  console.log(poster)
}

module.exports = {
  addNewPosterToDb
}