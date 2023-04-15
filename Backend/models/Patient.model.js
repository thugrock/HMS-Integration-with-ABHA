const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },

  patientID: {
    type: Number,
    required: true,
  },

  patientName: {
    type: String,
  },

  abhaID: {
    type: String,
  },
  

  mobile: {
    type: Number,
    minlength: 10,
    maxlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    default: "password",
  },


  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  image: {
    type: String,
  },


  details: {
    type: String,
  },

  date: {
    type: Date,
  },

});

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = { PatientModel };
