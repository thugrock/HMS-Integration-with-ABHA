const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { PatientModel } = require("../models/Patient.model");
const { PatientVisitModel} = require("../models/PatientVisits.model")
const { LinkingModel } = require("../models/LinkingToken.model")
const router = express.Router();

let accessToken = "";
async function startSession(){
    var data = {
        clientId: process.env.clientID.toString(),
        clientSecret: process.env.clientSecret.toString(),
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

router.post('/addCareContext', async(req, res) => {
    await startSession();
    const {abha, display1, display2, message} = req.body;
    console.log(abha)
    const patient = await PatientModel.findOne({"abhaID": abha})
    if(!patient){
        return res.send("Patient with ABHA ID doesn't exist");
    }
    const {patientID} = patient;
    const patient_visit = await PatientVisitModel.findOne({patientID})
    const {visitID} = patient_visit;
    console.log(patientID, visitID);
    const {linking_token} = await LinkingModel.findOne({"patientID": patientID, "visitID": String(visitID)})
    var requestID = uuidv4();
    var Timestamp = new Date().toISOString();
    var data = {
        requestId: requestID,
        timestamp: Timestamp,
        link: {
            accessToken: linking_token,
            patient:{
                referenceNumber: String(patientID),
                display: String(display1),
                careContexts:[
                    {
                    referenceNumber: "visit-"+String(visitID),
                    display: String(display2)
                    }
                ]
            }

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
    await axios.post('https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts', data, options_local)
    .then((res) => {
        console.log('add-care-context Successful')
        })
        .catch((err) => {
        console.log("add-care-context Failed");
    })
})
module.exports = router;