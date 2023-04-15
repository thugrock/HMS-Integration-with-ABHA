const mongoose = require("mongoose");

const PatientVisitsSchema = mongoose.Schema({
    patientID: {
        type: Number,
        ref: "patients",
      },
    
      visitID: {
        type: Number,
      },
    
})

const PatientVisitModel = mongoose.model("patient_visits", PatientVisitsSchema);

module.exports = { PatientVisitModel };
