import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SubmitReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const notify = (text) => toast(text);
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Add_Doctor.css";

const Discharge_and_Create_Slip = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const initmed = {
    medName: "",
    dosage: "",
    duration: "",
  };
  const [med, setmed] = useState(initmed);

  const [medicines, setmedicines] = useState([]);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }
  if (data?.user === null) {
    return <Navigate to={"/dashboard"} />;
  }
  if (data?.user !== null && data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  const HandleMedChange = (e) => {
    setmed({ ...med, [e.target.name]: e.target.value });
  };
  const [images, setImages] = useState([]);

  const HandleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const InitData = {
    docID: data?.user.docID,
    patientID: "",
    visitID: "",
    medicines: [],
    extrainfo: "",
    patientBloodGroup: "",
    patientDisease: "",
    patientTemperature: "",
    patientWeight: "",
    patientBP: "",
    patientGlucose: "",
    date: "",
    time: "",
    images: [],
  };

  const [ReportValue, setReportValue] = useState(InitData);

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };

  const HandleMedAdd = (e) => {
    e.preventDefault();
    setmedicines([...medicines, med]);
    setmed(initmed);
  };

  const HandleReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...ReportValue,
      medicines,
      images,
    };
    const formData = new FormData();
    formData.append("docID", String(data.docID));
    formData.append("patientID", String(data.patientID));
    formData.append("visitID", String(data.visitID));
    formData.append("extrainfo", String(data.extrainfo));
    formData.append("patientBloodGroup", String(data.patientBloodGroup));
    formData.append("patientDisease", String(data.patientDisease));
    formData.append("patientTemperature", String(data.patientTemperature));
    formData.append("patientWeight", String(data.patientWeight));
    formData.append("patientBP", String(data.patientBP));
    formData.append("patientGlucose", String(data.patientGlucose));
    formData.append("date", String(data.date));
    formData.append("time", String(data.time));
    formData.append("medicines", JSON.stringify(medicines));
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setLoading(true);
      dispatch(SubmitReport(formData)).then((res) => {
        if (res.message === "Report Created Sucessfully") {
          notify("Report Created Sucessfully");
          setLoading(false);
          setReportValue(InitData);
        } else {
          setLoading(false);
          notify("Something went Wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles_global.container}>
        <Sidebar />
        <div className={styles_global.AfterSideBar}>
          <div className={"Main_Add_Doctor_div"}>
            <h1>Create Report</h1>
            <form>
              <div>
                <label>Patient ID</label>
                <div className={"inputdiv"}>
                  <input
                    type="number"
                    placeholder="Patient ID"
                    name="patientID"
                    value={ReportValue.patientID}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Visit ID</label>
                <div className={"inputdiv"}>
                  <input
                    type="number"
                    placeholder="Consultation ID of patient"
                    name="visitID"
                    value={ReportValue.visitID}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Patient Blood Group</label>
                <div className={"inputdiv"}>
                  <select
                    name="patientBloodGroup"
                    value={ReportValue.patientBloodGroup}
                    onChange={HandleReportChange}
                    required
                  >
                    <option value="Choose Blood Group">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Patient Disease</label>
                <div className={"inputdiv"}>
                  <input
                    type="text"
                    placeholder="Disease"
                    name="patientDisease"
                    value={ReportValue.patientDisease}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Patient Temperature</label>
                <div className={"inputdiv"}>
                  <input
                    type="number"
                    placeholder="99^C"
                    name="patientTemperature"
                    value={ReportValue.patientTemperature}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>

              <div>
                <label>Patient Weight</label>
                <div className={"inputdiv"}>
                  <input
                    type="number"
                    placeholder="75 KG"
                    name="patientWeight"
                    value={ReportValue.patientWeight}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Patient BP</label>
                <div className={"inputdiv addressdiv"}>
                  <input
                    type="text"
                    placeholder="140/90 mmHg"
                    name="patientBP"
                    value={ReportValue.patientBP}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Patient Glucose</label>
                <div className={"inputdiv"}>
                  <input
                    type="number"
                    placeholder="99 mg/dL"
                    name="patientGlucose"
                    value={ReportValue.patientGlucose}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Extra Info</label>
                <div className={"inputdiv"}>
                  <input
                    type="text"
                    placeholder="Info"
                    name="extrainfo"
                    value={ReportValue.extrainfo}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              {/* ******************************************** */}
              <div>
                <label>Medicines</label>
                <div className={"inputdiv"}>
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={med.medName}
                    onChange={HandleMedChange}
                  />
                  <select name="duration" onChange={HandleMedChange}>
                    <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                  <select name="dosage" onChange={HandleMedChange}>
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <input type="submit" value={"Add"} onClick={HandleMedAdd} />
                </div>
              </div>
              {/* *********************************** */}
              <div>
                <label>Date</label>
                <div className={"inputdiv"}>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="date"
                    value={ReportValue.date}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className={"inputdiv"}>
                  <input
                    type="time"
                    name="time"
                    value={ReportValue.time}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Add Files</label>
                <div className={"inputdiv"}>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    onChange={HandleImageChange}
                  />
                </div>
              </div>
              <button
                className={"formsubmitbutton bookingbutton"}
                onClick={HandleReportSubmit}
              >
                {loading ? "Loading..." : "Generate Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discharge_and_Create_Slip;
