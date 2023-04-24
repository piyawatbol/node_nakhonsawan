const mongoose = require("mongoose");

const MunicipalForm = new mongoose.Schema({
  uid: String,
  title : String,
  first_name : String,
  last_name: String,
  id_card: String,
  file : Array,
  date: String,
  time: String,
});

module.exports = mongoose.model("MunicipalForm", MunicipalForm);