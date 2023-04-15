const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },
  patientID: {
    type: Number,
    required: true,
    ref: "patients"
  },
  visitID: {
    type: Number,
    required: true,
    ref: "patient_visits"
  },
  abhaID:{
    type: String,
  },

  patientName: {
    type: String,
  },

  DOB:{
    type: Date,
  },

  mobile: {
    type: Number,
  },
  
  email: {
    type: String,
  },

  address: {
    type: String,
  },

  disease: {
    type: String,
  },

  department: {
    type: String,
  },

  time: {
    type: String,
  },

  date: {
    type: String,
  },

  gender: {
    type: String,
    required: true,
  },

  docID:{
    type: Number,
    ref: "doctors",
  },
});

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = { AppointmentModel };
