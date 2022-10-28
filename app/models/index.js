const dbConfig = require("../config/db.config");

const mongoose = require('mongoose');

const db = {
  mongoose,
  url : dbConfig.url,
  address : require('./address.model')(mongoose),
  user : require('./user.model')(mongoose)
}

module.exports = db;