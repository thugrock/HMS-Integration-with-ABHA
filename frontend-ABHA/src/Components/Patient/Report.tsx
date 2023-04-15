import "./Report.css";
import "./about.css";
import NavBars from "../../Sections/navbar";
import { FiHome } from "react-icons/fi";
import Footer from "../../Sections/footer";
import ToTop from "../../Sections/totop";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "../../index.css";
import { GetAllReports, GetDoctorDetails } from "../../Redux/Datas/action";
import { GetFiles } from "../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button_Select from "./Button_Select";
const notify = (text) => toast(text);

function Service() {
  let { data } = useSelector((store) => store.auth);
  const { patients } = useSelector((store) => store.data.patients);
  console.log(patients);
  if (data.isAuthenticated !== true) {
    notify("Please Login to get your reports");
  }
  const dispatch = useDispatch();
  const [filenames, setFilenames] = useState([]);
  const [images, setImages] = useState([]);
  const [button, setButton] = useState(false);

  const [Report, setReport] = useState("");
  const [pat, setPat] = useState([]);
  const [Doctors, setDoctors] = useState([]);

  let merged = [];
  const [payload, setpayload] = useState([]);

  useEffect(() => {
    dispatch(GetAllReports()).then((res) => {
      setReport(res);
    });
    dispatch(GetDoctorDetails()).then((res) => {
      setDoctors(res);
    });
    setPat(
      patients?.find((itmInner) => itmInner.patientID === data?.user.patientID)
    );
  }, []);

  useEffect(() => {
    if (Doctors) {
      console.log("Data has been fetched:", Doctors);
    }
    if (Report) {
      console.log("Data has been fetched:", Report);
    }

    for (let i = 0; i < Report.length; i++) {
      merged.push({
        ...Report[i],
        ...patients?.find(
          (itmInner) => itmInner.patientID === Report[i].patientID
        ),
        ...Doctors.find((itmInner) => itmInner.docID === Report[i].docID),
        patAbhaID: patients?.find(
          (itmInner) => itmInner.patientID === Report[i].patientID
        ).abhaID,
        patDOB: patients?.find(
          (itmInner) => itmInner.patientID === Report[i].patientID
        ).DOB,
      });
    }
    merged = merged;
    merged.map((el) => {
      let date = new Date(el.createdAt);
      let date2 = new Date(el.date);
      let date3 = new Date(el.patDOB);
      el.createdAt_printabble =
        date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
      el.visit_printabble =
        date2.getDay() + "/" + date2.getMonth() + "/" + date2.getFullYear();
      el.patdob_printable =
        date3.getDay() + "/" + date3.getMonth() + "/" + date3.getFullYear();
    });
    setpayload(merged.filter((ele) => ele.patientID === pat.patientID));
  }, [Report, Doctors]);
  console.log(payload);

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
  }, [filenames]);

  console.log(images);
  const handleFilenameClick = (event) => {
    setButton(!button);
  };
  return (
    <div>
      <NavBars />
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Reports</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>
                      <FiHome />
                      Home
                    </Link>
                  </li>
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
                <th>Registered Date</th>
              </tr>
            </thead>

            <tbody>
              {payload.map((elem) => {
                return (
                  <tr>
                    <td>{elem.patientName}</td>
                    <td>{elem.abhaID}</td>
                    <td>{elem.patientDisease}</td>
                    <td>{elem.docName}</td>
                    <td>{elem.department}</td>
                    <td>{elem.date}</td>
                  </tr>
                );
              })}
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
          {payload.map((elem) => {
            return (
              <div className="reportContainer">
                <div className="reportHeading">
                  <h1>HEALTH REPORT</h1>
                </div>
                <div className="reportDetail">
                  <div>
                    <p>Doctor Name : {elem.docName}</p>
                    <p>Department : {elem.department}</p>
                  </div>
                  <div>
                    <p>Patient Name : {elem.patientName}</p>
                    <p>DOB :{elem.patdob_printable}</p>
                    <p>ABHA : {elem.patAbhaID}</p>
                    <p>Consultation ID: {elem.visitID}</p>
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
                    <p>{elem.patientBloodGroup}</p>
                    <p> {elem.patientDisease}</p>
                    <p>{elem.patientTemperature} C</p>
                    <p>{elem.patientWeight} KG </p>
                    <p>{elem.patientBP} mm/hg</p>
                    <p>{elem.patientGlucose} mg/dl</p>
                    <p>{elem.extrainfo} </p>
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
                      {elem.medicines.map((ele) => {
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
                  <p>Date : {elem.visit_printabble}</p>
                  <p>Time : {elem.time}</p>
                </div>

                {
                  <Button_Select
                    filenames={elem.images}
                    setFilenames={setFilenames}
                    onClick={handleFilenameClick}
                  />
                }

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
            );
          })}
        </>
      )}
      {/*<Footer />*/}
      <ToTop />
    </div>
  );
}

export default Service;
