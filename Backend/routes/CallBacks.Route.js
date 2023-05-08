const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { LinkingModel } = require("../models/LinkingToken.model");
const { PatientModel } = require("../models/Patient.model");
const { AppointmentModel } = require("../models/Appointment.model")
const { PatientVisitModel } = require("../models/PatientVisits.model")
const { ConsentArtifactModel} = require("../models/ConsentArtifact.model");
const { ReportModel } = require("../models/Report.model");
const {encryptData, decryptData} = require("../fidelius-cli-main/examples/node/index");
const { EncounterModel } = require("../models/Encounter.model");
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
      clientId: process.env.clientID,
      clientSecret:process.env.clientSecret,
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

router.post('/v0.5/consent-requests/on-init', async(req, res)=>{
  console.log("On-consent-request init received");
  //consentID = req.body.consentRequest.id;
  console.log('Consent ID is:', req.body);
})

router.post('/v0.5/consents/hip/notify', async(req, res)=>{
  console.log("Consent hip notify received");
  var data = req.body;
  console.log(data);
  var consent = {
    consentId: data.notification.consentDetail.consentId,
    createdAt: data.notification.consentDetail.createdAt,
    purpose_code: data.notification.consentDetail.purpose.code,
    patient_abha:   data.notification.consentDetail.patient.id,
    consent_manager:  data.notification.consentDetail.consentManager.id,
    hip_id:  data.notification.consentDetail.hip.id,
    hip_name:  data.notification.consentDetail.hip.name,
    hiTypes:  data.notification.consentDetail.hiTypes,
    accessMode:  data.notification.consentDetail.permission.accessMode,
    from_date:  data.notification.consentDetail.permission.dateRange.from,
    to_date:  data.notification.consentDetail.permission.dateRange.to,
    erase_date: data.notification.consentDetail.permission.dataEraseAt,
    status: data.notification.status,
    request_id: data.requestId,
    care_contexts: data.notification.consentDetail.careContexts,
    }
    console.log(consent);

    const newConsent = new ConsentArtifactModel
    (consent);
    await newConsent.save();
    var requestID = uuidv4();
    var Timestamp = new Date().toISOString();
    var callback_data = {
      requestId: requestID,
      timestamp: Timestamp,
      acknowledgement: [
          {
              status: "OK",
              consentId: data.notification.consentDetail.consentId,
          }
      ],
      resp: {
          requestId: data.requestId,
      }
    }
    var options_local = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'X-CM-ID': 'sbx',
          'Authorization': 'Bearer '+accessToken.toString()
      }
  };
  await startSession();
  await axios.post('https://dev.abdm.gov.in/gateway/v0.5/consents/hip/on-notify', callback_data, options_local)
    .then((res) => {
        console.log('hip on-notify sent Successful')
        })
        .catch((err) => {
        console.log("hip on-notify sent Successful");
    })

})
router.post('/v0.5/health-information/hip/request', async(req, res)=>{
  try{
  console.log("health information-request received");
  //consentID = req.body.consentRequest.id;
  var data = req.body;
  var consentID = data.hiRequest.consent.id;
  const consentArtifact = await ConsentArtifactModel.findOne({consentId: consentID})
  if(!consentArtifact){
    res.status(400).send("Consent ID Not Found");
  }
  var {patientID} = await PatientModel.findOne({abhaID: consentArtifact.patient_abha})
  var careContexts = consentArtifact.care_contexts;
  var reports_to_be_sent = [];
  for (let i = 0; i < careContexts.length; i++) {
    var carecontext_reference = careContexts[i].careContextReference.toString();
    var visitToken = ""
    if (carecontext_reference.startsWith('visit-')) {
      visitToken = carecontext_reference.substring(6);
      if (!isNaN(Number(visitToken))) {
        visitToken = Number(visitToken);
        var report = await ReportModel.findOne({patientID: patientID, visitID: visitToken})
        if(report){
          reports_to_be_sent.push(report)
      }
    }
    }
  }
  function convertToBundle(reports_to_be_sent) {
    console.log("sending reports")
    const bundle = {
      resourceType: "Bundle",
      type: "transaction",
      entry: []
    };
  
    for (let record of reports_to_be_sent) {
      const entry = {
        resource: {
          resourceType: "Encounter",
          id: record._id.toString(),
          identifier: [
            {
              system: "http://hospital.com/docID",
              value: record.docID.toString()
            },
            {
              system: "http://hospital.com/patientID",
              value: record.patientID.toString()
            },
            {
              system: "http://hospital.com/visitID",
              value: record.visitID.toString()
            }
          ],
          status: "finished",
          subject: {
            reference: `Patient/${record.patientID.toString()}`
          },
          period: {
            start: `${record.date.toISOString().slice(0,10)}T${record.time}:00Z`
          },
          reasonCode: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "10509002",
                  display: "Dengue fever (disorder)"
                }
              ]
            }
          ],
          extension: [
            {
              url: "http://hospital.com/extrainfo",
              valueString: record.extrainfo
            },
            {
              url: "http://hospital.com/patientTemperature",
              valueDecimal: record.patientTemperature
            },
            {
              url: "http://hospital.com/patientWeight",
              valueDecimal: record.patientWeight
            },
            {
              url: "http://hospital.com/patientBP",
              valueString: record.patientBP
            },
            {
              url: "http://hospital.com/patientGlucose",
              valueDecimal: record.patientGlucose
            }
          ]
        },
        request: {
          method: "POST",
          url: "Encounter"
        }
      };
      
      bundle.entry.push(entry);
    }
  console.log(bundle)
    return bundle;
  }
  Stringfied_data = JSON.stringify(convertToBundle(reports_to_be_sent))
  var x = data.hiRequest.keyMaterial.nonce;
  var y = data.hiRequest.keyMaterial.dhPublicKey.keyValue;
  var encrypted_data = encryptData({stringToEncrypt: Stringfied_data, senderNonce:process.env.senderNonce , requesterNonce: x , senderPrivateKey:process.env.senderPrivateKey, requesterPublicKey:y})
  //var decrypted_data = decryptData({encryptedData:encrypted_data?.encryptedData,requesterNonce:x, senderNonce:'j6WoqaJ3QaBJESKwBtk9Acx5P5acguzbOycfBdsE2sI=' ,senderPublicKey:'',requesterPrivateKey:'AcQik0hEg1mMSOw76xZWNQLHfDTdWAN88z1012m5gX8='})
  console.log("Encrypted Bundle is: ");
  console.log(encrypted_data);
  var data_sent = {
    "pageNumber": 0,
    "pageCount": 1,
    "transactionId": uuidv4(),
    "entries": [
        {
            "content": encrypted_data?.encryptedData,
            "media": "application/fhir+json",
            "checksum": "string",
            "careContextReference": consentID
        }
    ],
    "keyMaterial": {
        "cryptoAlg": "ECDH",
        "curve": "Curve25519",
        "dhPublicKey": {
            "expiry": "2024-10-06T10:50:37.764Z",
            "parameters": "Curve25519/32byte random key",
            "keyValue": process.env.senderPublicKey
        },
        "nonce": process.env.senderNonce
    }
  }
  var options_local = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Connection': 'keep-alive',
    }
  };
  console.log("Data is being pushed to:");
  console.log(data.hiRequest.dataPushUrl.toString());
  await axios.post(data.hiRequest.dataPushUrl.toString(), data_sent, options_local)
    .then((res) => {
        console.log('Data Transfered Success')
        })
        .catch((err) => {
        console.log("Data Transfer Failed");
    })

  res.status(200).send("successfully transferred data");
  }catch(error){
  res.status(404).send("Failed transferring data");
  }
})
router.get("/getExternal", async(req, res)=>{
  try{
    var data = await EncounterModel.find();
    return res.send(data);
  }catch(error){
    return "error";
  }
})
module.exports = router;
