const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "admin",
  },

  adminID: {
    type: Number,
    required: true,
  },

  abhaID: {
    type: String,
  },

  adminName: {
    type: String,
  },
  mobile: {
    type: Number,
    minlength: 10,
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
  blood_group:{
    type: String,
  },
  joining_date: {
    type: Date,
  },
  education: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
