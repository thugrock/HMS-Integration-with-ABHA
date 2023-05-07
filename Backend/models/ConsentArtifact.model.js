const mongoose = require('mongoose');

const careContextSchema = new mongoose.Schema({
  patientReference: String,
  careContextReference: String
});

const consentArtifactSchema = new mongoose.Schema({
    consentId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    purpose_code: {
        type: String,
        required: true,
    },
    patient_abha:   {
        type: String,
        required: true,
    },
    consent_manager:  {
        type: String,
        required: true,
    },
    hip_id:  {
        type: String,
        required: true,
    },
    hip_name:  {
        type: String,
        required: true,
    },
    hiTypes:  [String],
    accessMode:  {
        type: String,
        required: true,
    },
    from_date:  {
        type: Date,
        required: true,
    },
    to_date:  {
        type: Date,
        required: true,
    },
    erase_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    request_id: {
        type: String,
        required: true,
    },
    care_contexts: [careContextSchema],
    rowCreatedAt: {
        type: Date,
        default: Date.now
    }
});

const ConsentArtifactModel = mongoose.model('consents', consentArtifactSchema);

module.exports = {ConsentArtifactModel};
