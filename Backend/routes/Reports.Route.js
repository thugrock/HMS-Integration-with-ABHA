const express = require("express");
const { ReportModel } = require("../models/Report.model");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mime = require('mime')
const router = express.Router();

// Define storage for the image file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Define file filter for image file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// Initialize multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { files: 5 },
});

router.post('/submit-report', upload.array('images'), async (req, res) => {
  const { docID,
    patientID,
    visitID,
    medicines,
    extrainfo,
    patientBloodGroup,
    patientDisease,
    patientTemperature,
    patientWeight,
    patientBP,
    patientGlucose,
    date,
    time } = req.body;
    console.log(req);
  const filenames = req.files.map((file) => file.filename);
  try {
    const report = new ReportModel({
      docID: docID,
      patientID: patientID,
      visitID: visitID,
      medicines: JSON.parse(medicines),
      extrainfo: extrainfo,
      patientBloodGroup: patientBloodGroup,
      patientDisease: patientDisease,
      patientTemperature: patientTemperature,
      patientWeight: patientWeight,
      patientBP: patientBP,
      patientGlucose: patientGlucose,
      date: date,
      time: time,
      images: filenames,
    });

    await report.save();

    res.status(200).json({ message: 'Report Created Sucessfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const reports = await ReportModel.find(query);
    res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const report = new ReportModel(payload);
    await report.save();
    res.send({ message: "Report successfully created", report });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  const payload = req.body;
  try {
    const report = await ReportModel.findByIdAndUpdate({ _id: id }, payload);
    if (!report) {
      res.status(404).send({ msg: `Report with id ${id} not found` });
    }
    res.status(200).send(`Report with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  try {
    const report = await ReportModel.findByIdAndDelete({ _id: id });
    if (!report) {
      res.status(404).send({ msg: `Report with id ${id} not found` });
    }
    res.status(200).send(`Report with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Endpoint to handle file requests
router.post('/files', (req, res) => {
  try {
    console.log(req.body)
    const filenames = req.body;

    // Map filenames to file paths
    const filePaths = filenames.map(filename => path.join(__dirname, '/../uploads', filename));

    // Read files and build response
    const response = filePaths.map(filePath => {
      const fileData = fs.readFileSync(filePath);
      return {
        name: path.basename(filePath),
        data: fileData.toString('base64'),
        contentType: mime.lookup(filePath) // Requires 'mime' package
      };
    });

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
