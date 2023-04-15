const mongoose = require("mongoose");

const LinkingTokenSchema = mongoose.Schema({
    patientID: {
        type: Number,
        ref: "patients",
      },
    visitID:{
      type: String,
      required: true,
    },
    linking_token: {
      type: String,
    },
    
})

const LinkingModel = mongoose.model("linkings", LinkingTokenSchema);

module.exports = { LinkingModel };
