const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");


const adminRouter = require("./routes/Admins.Route");
const appointmentRouter = require("./routes/Appointments.Route");
const doctorRouter = require("./routes/Doctors.Route");
const hospitalRouter = require("./routes/Hospitals.Route");
const frontDeskRouter = require("./routes/FrontDesk.Route");
const patientRouter = require("./routes/Patients.Route");
const paymentRouter = require("./routes/Payments.route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");
const callBacks = require("./routes/CallBacks.Route")
const careContextRouter = require("./routes/CareContexts.Route");
const consentRouter = require("./routes/Consents.Route");
const hiuCallBacks = require("./routes/HiuCallbacks.Route");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/",callBacks);
app.use("/",hiuCallBacks);
app.use("/admin", adminRouter);
app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/frontdesks", frontDeskRouter);
app.use("/patients", patientRouter);
app.use("/payments", paymentRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);
app.use("/carecontexts", careContextRouter);
app.use("/consents", consentRouter);


let accessToken = "";
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
    console.log(error);
  }
  console.log(`Listening at port ${process.env.port}`);
});
async function session_and_patch(){ 
    console.log(process.env.clientID.toString())
    var data = {
    clientId: process.env.clientID.toString(),
    clientSecret: process.env.clientSecret.toString()
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
    console.log("Session Ended");
    console.log("Patch Started");
    data = {
    url: process.env.callbackURL.toString()
    }
    options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Authorization': 'Bearer '+accessToken.toString(),
    }
    };
    await axios.patch('https://dev.abdm.gov.in/devservice/v1/bridges', data, options)
    .then((res) => {
    console.log("Patch Successful");
    })
    .catch((err) => {
    console.log("ERRor===", err);
    })
}
session_and_patch();

