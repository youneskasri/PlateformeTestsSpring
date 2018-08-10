const moment = require("moment");
require('moment/locale/fr');
moment.locale("fr");


module.exports = function formatDate(date, format) {
  return moment(date).format(format || "Do MMMM YYYY");
}