const moment = require("moment")

const hbsHelper = (handlebars) => {
  handlebars.registerHelper('formatData', function (dateString) {
    return new handlebars.SafeString(
      moment(dateString).format("DD.MM.YYYY").toUpperCase()
    )
  })
}

module.exports = hbsHelper