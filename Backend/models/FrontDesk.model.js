const mongoose = require("mongoose");

const frontDeskSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "frontdesk",
  },

  frontDeskID: {
    type: Number,
    required: true,
  },

  abhaID: {
    type: String,
  },
  

  frontDeskName: {
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

  bloodGroup: {
    type: String,
  },
  department: {
    type: String,
  },
  joining_date:{
    type: Date,
  },
  education: {
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

const FrontDeskModel = mongoose.model("frontdesk", frontDeskSchema);

module.exports = { FrontDeskModel };
