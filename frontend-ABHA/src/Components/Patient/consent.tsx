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
import { GetAllReports, GetAllConsents } from "../../Redux/Datas/action";
import { GetFiles } from "../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button_Select from "./Button_Select";
const notify = (text) => toast(text);

function Service() {
  let { data } = useSelector((store) => store.auth);
  if (data.isAuthenticated !== true) {
    notify("Please Login to get your reports");
  }
  const dispatch = useDispatch();
  const [consents, setAllConsents] = useState([]);

  const [payload, setpayload] = useState([]);

  useEffect(() => {
    dispatch(GetAllConsents()).then((res) => {
      setAllConsents(res);
    });
    console.log(consents)
  }, []);
  useEffect(()=>{
    console.log(consents);
    if(consents.length>0){
      setpayload(
        consents?.filter((itmInner) => itmInner.patient_abha === data?.user.abhaID)
      );
    }else{
      setpayload([]);
    }
  }, [consents, setAllConsents]);
  console.log(payload);
  return (
    <div>
      <NavBars />
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Approved Consents</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>
                      <FiHome />
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Consents
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
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
                  <h1>CONSENT ARTEFACT</h1>
                </div>
                <div className="reportDetail">
                  <div>
                    <p>ConsentID : {elem.consentId}</p>
                    <p>Created At : {elem.createdAt}</p>
                  </div>
                  <div>
                    <p>Patient ABHA : {elem.patient_abha}</p>
                    <p>Purpose code :{elem.purpose_code}</p>
                    <p>Consent Manager: {elem.consent_manager}</p>
                    <p>HIP ID:{elem.hip_id}</p>
                    <p>HIP Name: {elem.hip_name}</p>
                    
                  </div>
                </div>
                <div className="reportMedical">
                  <div>
                    <p>From Date : </p>
                    <p>To Date :</p>
                    <p>Data Erase : </p>
                    <p>Status :</p>
                    <p>request ID :</p>
                  </div>
                  <div>
                    <p>{elem.from_date}</p>
                    <p>{elem.to_date}</p>
                    <p>{elem.erase_date}</p>
                    <p>{elem.status}</p>
                    <p>{elem.request_id}</p>
                  </div>
                </div>
                <div className="reportMedicines">
                  <table>
                    <thead>
                      <tr>
                        <th>Patient Reference ID</th>
                        <th>CareContext Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elem.care_contexts.map((ele) => {
                        return (
                          <tr>
                            <td>{ele.patientReference}</td>
                            <td>{ele.careContextReference}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
