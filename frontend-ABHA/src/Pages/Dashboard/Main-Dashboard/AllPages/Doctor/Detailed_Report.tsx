import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import { useDispatch, useSelector } from "react-redux";

import "./CSS/Report.css";
import "./CSS/about.css";
import "../../../../../index.css";
import { GetFiles } from "../../../../../Redux/Datas/action";
const notify = (text) => toast(text);

const Detailed_Report = ({ payload, onClose }) => {
  console.log(payload);
  const [filenames, setFilenames] = useState(payload.images);
  const [images, setImages] = useState([]);
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();

  let { data } = useSelector((store) => store.auth);
  if (data.isAuthenticated !== true) {
    notify("Please Login to get your reports");
  }
  useEffect(() => {
    if (filenames) {
      dispatch(GetFiles(filenames)).then((res) => {
        if (res === "error") {
          notify("Error in fetching files");
        } else {
          setImages(res);
        }
      });
    }
  }, []);

  console.log(images);
  const handleFileClick = (event) => {
    event.preventDefault();
    setButton(!button);
  };

  return (
    <>
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Reports</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    Report
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {data.isAuthenticated !== true ? null : (
        <div className="reportTables">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>ABHA ID</th>
                <th>Disease</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{payload.patientName}</td>
                <td>{payload.abhaID}</td>
                <td>{payload.patientDisease}</td>
                <td>{payload.docName}</td>
                <td>{payload.department}</td>
                <td>{payload.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {data.isAuthenticated !== true ? (
        <div className="reportLogin">
          <h1>No reports available</h1>
          <h1>Please login !</h1>
        </div>
      ) : (
        <>
          <div className="reportContainer">
            <div className="reportHeading">
              <h1>HEALTH REPORT</h1>
            </div>
            <div className="reportDetail">
              <div>
                <p>Doctor Name : {payload.docName}</p>
                <p>Department : {payload.department}</p>
              </div>
              <div>
                <p>Patient Name : {payload.patientName}</p>
                <p>DOB :{payload.patdob_printable}</p>
                <p>ABHA : {payload.patAbhaID}</p>
                <p>Consultation ID: {payload.visitID}</p>
              </div>
            </div>
            <div className="reportMedical">
              <div>
                <p>Blood Group : </p>
                <p>Disease :</p>
                <p>Temperature : </p>
                <p>Weight :</p>
                <p>BP :</p>
                <p>Blood Sugar :</p>
                <p>Remarks :</p>
              </div>
              <div>
                <p>{payload.patientBloodGroup}</p>
                <p> {payload.patientDisease}</p>
                <p>{payload.patientTemperature} C</p>
                <p>{payload.patientWeight} KG </p>
                <p>{payload.patientBP} mm/hg</p>
                <p>{payload.patientGlucose} mg/dl</p>
                <p>{payload.extrainfo} </p>
              </div>
            </div>
            <div className="reportMedicines">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {payload.medicines.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.medName}</td>
                        <td>{ele.dosage}</td>
                        <td>{ele.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="reportDate">
              <p>Date : {payload.visit_printabble}</p>
              <p>Time : {payload.time}</p>
            </div>
            <button className="custom-btn btn-3" onClick={handleFileClick}>
              <span>Show Files</span>
            </button>
            <br />
            <br />
            {button && images && (
              <div>
                {images.map((image) => (
                  <div key={image.name}>
                    <h2>{image.name}</h2>
                    <img
                      src={`data:${image.contentType};base64,${image.data}`}
                      alt={image.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="custom-btn btn-3" onClick={onClose}>
            <span>Close</span>
          </button>
        </>
      )}
    </>
  );
};
export default Detailed_Report;
