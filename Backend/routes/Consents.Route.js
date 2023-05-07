const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { LinkingModel } = require("../models/LinkingToken.model");
const { PatientModel } = require("../models/Patient.model");
const { AppointmentModel } = require("../models/Appointment.model")
const { PatientVisitModel } = require("../models/PatientVisits.model")
const { ConsentArtifactModel} = require("../models/ConsentArtifact.model");
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
      clientId: process.env.clientID.toString(),
      clientSecret:process.env.clientSecret.toString(),
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
router.post("/requestConsent", async (req, res) => {
  console.log('Consent request received')
    try {
        await startSession();
        const {purpose_code, abha, docName, docID, report_type, from_date, to_date} = req.body;
        console.log(abha)
        var requestID = uuidv4();
        var Timestamp = new Date().toISOString();
        var data = {
            requestId: requestID,
            timestamp: Timestamp,
            consent: {
                "purpose": {
                    "text": "string",
                    "code": purpose_code,
                },
                "patient": {
                    "id": abha,
                },
                "hiu": {
                    "id": "hiu-001"
                },
                "requester": {
                    "name": docName,
                    "identifier": {
                        "type": "REGNO",
                        "value": docID,
                        "system": "https://www.mciindia.org"
                    }
                },
                "hiTypes": [
                    "OPConsultation"
                ],
                "permission": {
                    "accessMode": "VIEW",
                    "dateRange": {
                        "from": from_date.concat("T23:59:59.000Z"),
                        "to": to_date.concat("T23:59:59.000Z"),
                    },
                    "dataEraseAt": to_date.concat("T23:59:59.000Z"),
                    "frequency": {
                        "unit": "HOUR",
                        "value": 1,
                        "repeats": 0
                    }
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
        await axios.post('https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init', data, options_local)
        .then((res) => {
            console.log('consent-request/init Successful')
            })
            .catch((err) => {
            console.log("consent-request/init Failed");
        })
    } catch (error) {
      console.log(error);
    }
  });

router.get('/getAllConsents', async(req, res)=>{
    try{
    const consentsData = await ConsentArtifactModel.find();
    res.status(200).send(consentsData);
    }catch(error){
        console.log(error);
        res.status(400).send("error in /getAllConsents")
    }
  
})
module.exports = router;