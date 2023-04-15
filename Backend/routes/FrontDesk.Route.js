const express = require("express");
const { FrontDeskModel } = require("../models/FrontDesk.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require('axios');
const {v4 :uuidv4} = require('uuid')
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const frontDesks = await FrontDeskModel.find();
    res.status(200).send(frontDesks);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});


router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const frontDesk = await FrontDeskModel.findOne({ email });
    if (frontDesk) {
      return res.send({
        message: "FrontDesk Member already exists",
      });
    }
    let value = new FrontDeskModel(req.body);
    await value.save();
    const data = await FrontDeskModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: "error" });
  }
});


router.post("/login", async (req, res) => {
  const { frontDeskID, password } = req.body;
  try {
    const frontDesk = await FrontDeskModel.findOne({ frontDeskID, password });

    if (frontDesk) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: frontDesk, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:frontDeskId", async (req, res) => {
  const id = req.params.frontDeskId;
  const payload = req.body;
  try {
    await FrontDeskModel.findByIdAndUpdate({ _id: id }, payload);
    const frontDesk = await FrontDeskModel.findById(id);
    if (!frontDesk) {
      return res.status(404).send({ message: `FrontDesk Member with id ${id} not found` });
    }
    res.status(200).send({ message: `FrontDesk Member Updated`, user: frontDesk });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:frontDeskId", async (req, res) => {
  const id = req.params.frontDeskId;
  try {
    const frontDesk = await FrontDeskModel.findByIdAndDelete({ _id: id });
    if (!frontDesk) {
      res.status(404).send({ msg: `FrontDesk member with id ${id} not found` });
    }
    res.status(200).send(`FrontDesk Member with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/registerByAbha", async(req, res) =>{
  const {abha, purpose} = req.body;
  const data = {
  clientId: "SBX_002858",
  clientSecret: "c3e44cf1-7806-416d-af4e-99f7ddd0c3e9"
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Connection': 'keep-alive',
    }
  };
  let accessToken = "";
  console.log("Session Started");
  await axios.post('https://dev.abdm.gov.in/gateway/v0.5/sessions', data, options)
  .then((res) => {
   accessToken = res.data.accessToken.toString();
  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
  console.log("Session Ended");
  try{
      var requestID = uuidv4();
      var Timestamp = new Date().toISOString();
      const data = {
        requestId: requestID,
        timestamp: Timestamp,
        query: {
          id: abha,
          purpose: purpose,
          authMode: "MOBILE_OTP",
          requester: {
            type: "HIP",
            id: "hip-003"
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
      await axios.post('https://dev.abdm.gov.in/gateway/v0.5/users/auth/init', data, options_local)
      .then((res) => {
          console.log('Init Successful')
        })
        .catch((err) => {
          console.log("Init Failed");
        })

  }catch(error){
    console.log(error);
  }
})


module.exports = router;
