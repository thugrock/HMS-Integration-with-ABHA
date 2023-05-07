const express = require("express");
require("dotenv").config();
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const { ConsentArtifact} = require("../models/ConsentArtifact.model");
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
  
module.exports = router;