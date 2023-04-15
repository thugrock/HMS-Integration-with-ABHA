const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({

  docID:{
    type: Number,
    required: true,
    ref: "doctors"
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
  
  medicines: [
    {
      medName: {
        type: String,
      },
      dosage: {
        type: Number,
      },
      duration: {
        type: String,
      },
    },
  ],

  extrainfo: {
    type: String,
  },
  patientBloodGroup: {
    type: String,
  },
  patientDisease: {
    type: String,
  },

  patientTemperature: {
    type: Number,
  },

  patientWeight: {
    type: Number,
  },
  patientBP: {
    type: String,
  },
  patientGlucose: {
    type: Number,
  },

  date: {
    type: Date,
  },

  time: {
    type: String,
  },
  images: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const ReportModel = mongoose.model("report", reportSchema);

module.exports = { ReportModel };
