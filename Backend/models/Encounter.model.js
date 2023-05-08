const mongoose = require('mongoose');


const EncounterSchema = new mongoose.Schema({
    id: String,
    identifier: [{
      system: String,
      value: String
    }],
    status: String,
    subject: String,
    period: Date,
    reasonCode: String,
    extrainfo: String,
    patientTemperature: Number,
    patientWeight: Number,
    patientBP: String,
    patientGlucose: Number,
    request: {
      method: String,
      url: String
    }
  });
  

const EncounterModel = mongoose.model('external_records', EncounterSchema);

module.exports = {EncounterModel};
