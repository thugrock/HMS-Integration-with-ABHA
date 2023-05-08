const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { ConsentArtifact} = require("../models/ConsentArtifact.model");
const { EncounterModel} = require("../models//Encounter.model");

const {encryptData, decryptData} = require("../fidelius-cli-main/examples/node/index")

const router = express.Router();

let accessToken = "";

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
router.post('/v0.5/consents/hiu/notify', async(req, res)=>{
    console.log("HIU Notify received");
    consentID = req.body;
    var requestID = uuidv4();
    var Timestamp = new Date().toISOString();
    var data = {
        "requestId": requestID,
        "timestamp": Timestamp,
        "acknowledgement": [
            {
                "status": "OK",
                "consentId": req.body.notification.consentArtefacts[0].id,
            }
        ],
        "resp": {
            "requestId": req.body.requestId
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
    await axios.post('https://dev.abdm.gov.in/gateway/v0.5/consents/hiu/notify', data, options_local)
      .then((res) => {
          console.log('hiu on-notify sent Successful')
          })
          .catch((err) => {
          console.log("hiu on-notify sent Successful");
      })

  })
  router.post('/data/push', async(req, res)=>{
    try{
    console.log("Data is being Notified..... Ready For Acceptance");
    var data = req.body;
    var encrypted_data = data.entries[0].content;
    var consentID = data.entries[0].careContextReference;
    var senderNonce = data.keyMaterial.nonce;
    var senderPublicKey = data.keyMaterial.dhPublicKey.keyValue;
    var decrypted_data = decryptData({encryptedData:encrypted_data,requesterNonce:process.env.requesterNonce, senderNonce:senderNonce ,senderPublicKey:senderPublicKey,requesterPrivateKey:process.env.requesterPrivateKey})
    function extractValues(json) {
        const obj = {};
      
        obj.resourceType = json.resourceType;
        obj.type = json.type;
        console.log(json.type);
        obj.entry = json.entry.map(entry => {
          const resource = entry.resource;
      
          const id = resource.id;
          const identifier = resource.identifier.map(id => ({
            system: id.system,
            value: id.value,
          }));
          const status = resource.status;
          const subject = resource.subject.reference;
          const period = resource.period.start;
          const reasonCode = resource.reasonCode[0].coding[0].display;
          const extrainfo = resource.extension.find(ext => ext.url === "http://hospital.com/extrainfo").valueString;
          const patientTemperature = resource.extension.find(ext => ext.url === "http://hospital.com/patientTemperature").valueDecimal;
          const patientWeight = resource.extension.find(ext => ext.url === "http://hospital.com/patientWeight").valueDecimal;
          const patientBP = resource.extension.find(ext => ext.url === "http://hospital.com/patientBP").valueString;
          const patientGlucose = resource.extension.find(ext => ext.url === "http://hospital.com/patientGlucose").valueDecimal;
      
          return {
            resourceType: resource.resourceType,
            id,
            identifier,
            status,
            subject,
            period,
            reasonCode,
            extrainfo,
            patientTemperature,
            patientWeight,
            patientBP,
            patientGlucose,
            request: entry.request,
          };
        });
      
        return obj;
      }
    var originalData = decrypted_data?.decryptedData;
    var transferred_report = extractValues(JSON.parse(originalData));
    console.log("Data received Successfully");
    const encounter = new EncounterModel({
        id: transferred_report.entry[0].id,
        identifier: transferred_report.entry[0].identifier,
        status: transferred_report.entry[0].status,
        subject: transferred_report.entry[0].subject,
        period: new Date(transferred_report.entry[0].period),
        reasonCode: transferred_report.entry[0].reasonCode,
        extrainfo: transferred_report.entry[0].extrainfo,
        patientTemperature: transferred_report.entry[0].patientTemperature,
        patientWeight: transferred_report.entry[0].patientWeight,
        patientBP: transferred_report.entry[0].patientBP,
        patientGlucose: transferred_report.entry[0].patientGlucose,
        request: transferred_report.entry[0].request
    });
    await encounter.save(); 
    console.log("Data saved Successfully"); 
    }catch(error){
        console.log(error)
    }
  })

module.exports = router;