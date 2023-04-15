const express = require("express");
const { AppointmentModel } = require("../models/Appointment.model");
const { PatientVisitModel } = require("../models/PatientVisits.model")
const router = express.Router();
let visitToken = 0;
router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const appointments = await AppointmentModel.find(query);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  const {patientID} = req.body;
  try {
    visitToken = 0;
    const patient_visit = await PatientVisitModel.findOne({patientID})
    if(patient_visit){
      visitToken = patient_visit.visitID;
    }
    else{
      const patient_vis = new PatientVisitModel({"patientID": patientID, "visitID": "0"})
      await patient_vis.save();
      visitToken = 1;
    }
    console.log(visitToken);

    console.log(patientID);
    await PatientVisitModel.findOneAndUpdate({patientID: patientID}, {$inc: {visitID: 1}})
    const appointment = new AppointmentModel({...payload, visitID: visitToken});
    await appointment.save();
  } catch (error) {
    res.send(error);
  }
  res.send("Appointment successfully booked.");
});

router.patch("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  const payload = req.body;
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  try {
    const appointment = await AppointmentModel.findByIdAndDelete({ _id: id });
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
