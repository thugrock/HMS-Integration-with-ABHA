const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { LinkingModel } = require("../models/LinkingToken.model");
const { PatientModel } = require("../models/Patient.model");
const { AppointmentModel } = require("../models/Appointment.model")
const { PatientVisitModel } = require("../models/PatientVisits.model")

const router = express.Router();

let transactionID = "";
let accessToken = "";
let linking_token = "";
let patient_object = null;
let add_by_abha = null;
let appoint_by_abha = null;
let call_type = "";
async function startSession(){
  var data = {
      clientId: "SBX_002858",
      clientSecret: "c3e44cf1-7806-416d-af4e-99f7ddd0c3e9"
      };
    
    var options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Connection': 'keep-alive',
      }
    };
    console.log("Session Started");
    await axios.post('https://dev.abdm.gov.in/gateway/v0.5/sessions', data, options)
    .then((res) => {
      accessToken = res.data.accessToken.toString();
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
    })
    console.log("Session call Ended");
}
router.post("/v0.5/users/auth/on-init", async (req, res) => {
  console.log('on-init received')
    try {
      transactionID = req.body.auth.transactionId
    } catch (error) {
      console.log(error);
    }
  });
router.post('/otpConfirm', async(req, res) => {
  const {callType, otp} = req.body;
  call_type = callType;
  await startSession();
  if(callType === "addbyabha"){
    add_by_abha = req.body;
  }
  if(callType === "appointbyabha"){
    appoint_by_abha = req.body;
  }
  var requestID = uuidv4();
  var Timestamp = new Date().toISOString();
  var data = {
    requestId: requestID,
    timestamp: Timestamp,
    transactionId: transactionID,
    credential: {
      authCode: otp
    }
  }; 
  var options_local = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'X-CM-ID': 'sbx',
        'Authorization': 'Bearer '+accessToken.toString()
    }
  };
  await axios.post('https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm', data, options_local)
  .then((res) => {
      console.log('confirm Successful')
    })
    .catch((err) => {
      console.log("confirm Failed");
  })
}   
)
  
router.post('/v0.5/users/auth/on-confirm', async (req, res) => {
  if (call_type === "addbyabha"){
    patient_object = req.body.auth.patient;
    console.log(patient_object)
    console.log(add_by_abha)
    if(patient_object !== null){
        data = {
          patientName: patient_object.name,
          patientID: add_by_abha.patientID,
          abhaID:patient_object.id, 
          email: add_by_abha.email,
          mobile: add_by_abha.mobile,
          password: add_by_abha.password,
          details: add_by_abha.details,
          date: add_by_abha.date,
          bloodGroup: add_by_abha.bloodGroup,
          gender: patient_object.gender,
          DOB: String(patient_object.yearOfBirth)+"-"+String(patient_object.monthOfBirth)+"-"+String(patient_object.dayOfBirth),
          address: String(patient_object.address.district)+" "+String(patient_object.address.state),
        }
      const { email, mobile, abhaID } = data;
      try {
        const f_patient = await PatientModel.findOne({ email });
        const f_patient1 = await PatientModel.findOne({ mobile });
        const f_patient2 = await PatientModel.findOne({ abhaID });
    
        if (f_patient===null && f_patient1===null && f_patient2===null) {    
          const newPatient = new PatientModel(data);
          await newPatient.save();
        }
      }catch(error){
        console.log(error);
      }
    }
    patient_object = null;
  }
  else if (call_type === "appointbyabha"){
    patient_object = req.body.auth.patient;
    linking_token = req.body.auth.accessToken;
    console.log(patient_object)
    console.log(appoint_by_abha)
      if(patient_object !== null){
        data = {
          patientName: patient_object.name,
          abhaID:patient_object.id, 
          email: appoint_by_abha.email,
          mobile: appoint_by_abha.mobile,
          disease: appoint_by_abha.disease,
          department: appoint_by_abha.department,
          date: appoint_by_abha.date,
          time: appoint_by_abha.time,
          gender: patient_object.gender,
          DOB: String(patient_object.yearOfBirth)+"-"+String(patient_object.monthOfBirth)+"-"+String(patient_object.dayOfBirth),
          address: String(patient_object.address.district)+" "+String(patient_object.address.state),
          docID: appoint_by_abha.docID
        }
      const {abhaID} = data;
      const f_patient = await PatientModel.findOne({abhaID});
      if(!f_patient){
        const newPatient = new PatientModel({...data, patientID: Date.now()});
        await newPatient.save();
      }
      var f_patient1 = await PatientModel.findOne({abhaID})
      const {patientID} = f_patient1;
      var visitToken = 0;
      const patient_visit = await PatientVisitModel.findOne({patientID})
      if(!patient_visit){
        const patient_vis = new PatientVisitModel({patientID: patientID, visitID: "0"})
        await patient_vis.save();
        visitToken = 1;
      }
      else{
        visitToken = patient_visit.visitID;
      }
      await PatientVisitModel.findOneAndUpdate({patientID: patientID}, {$inc: {visitID: 1}})
      const appointment = new AppointmentModel({...data, patientID: f_patient1.patientID, visitID: visitToken});
      await appointment.save();
      console.log(linking_token)
      if(linking_token !== ""){
        var d = {
          patientID: f_patient1.patientID,
          visitID: visitToken,
          linking_token: linking_token
        }
        const newLinkingToken = new LinkingModel(d);
        await newLinkingToken.save();
      }
    }
    linking_token = "";
    patient_object = null;
  }
  
})
router.post('/v0.5/links/link/on-add-contexts', async(req, res)=>{
  console.log("On-add-context received");
})
module.exports = router;