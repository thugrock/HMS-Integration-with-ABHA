const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  docNumbers: {
    type: Number,
  },

  patientNumbers: {
    type: Number,
  },

  frontDeskNumbers: {
    type: Number,
  },

  appointmentNumbers: {
    type: Number,
  },

  reportsNumbers: {
    type: Number,
  },
});

const HospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = { HospitalModel };
