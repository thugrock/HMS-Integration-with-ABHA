const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "doctor",
  },

  docID: {
    type: Number,
    required: true,
  },

  abhaID: {
    type: String,
  },

  docName: {
    type: String,
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
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  department: {
    type: String,
  },
  joining_date:{
    type: String,
  },

  specialization: {
    type: String,
  },
  shift_start:{
    type: String,
  },
  shift_end:{
    type: String
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },
});

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };
