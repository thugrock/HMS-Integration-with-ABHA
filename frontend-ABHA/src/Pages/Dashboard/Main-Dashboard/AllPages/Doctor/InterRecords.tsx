import { Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReports, RequestConsent, GetExternalRecords } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import EncounterTable from './Encounter';

import "../Admin/CSS/Payment.css";

const InterRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    purpose_code:"",
    abha: "",
    docName: user.docName,
    docID: user.docID,
    report_type: [],
    from_date: "",
    to_date: "",
  });
  const columns = [
    { title: "Artifact ID", dataIndex: "id", key: "id" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Date", dataIndex: "period", key: "period" },
    {
      title: "Reason",
      dataIndex: "reasonCode",
      key: "reasonCode",
    },
    { title: "Extra Info", dataIndex: "extrainfo", key: "extrainfo" },
    {
      title: "Temperature",
      dataIndex: "patientTemperature",
      key: "patientTemperature",
    },
    {
      title: "Weight",
      dataIndex: "patientWeight",
      key: "patientWeight",
    },
    {
      title: "BP",
      dataIndex: "patientBP",
      key: "patientBP",
    },
    {
      title: "Glucose",
      dataIndex: "patientGlucose",
      key: "patientGlucose",
    },
  ]
  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.value);
  };
  const handleInputChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  dispatch(GetExternalRecords()).then((res) => {
      setRecords(res);
      console.log(records);
  });
  const handleSubmit = (e) => {
    // Perform form submission logic here
    // Navigate to other page using history.push('/other-page')
    e.preventDefault();
    // Perform form submission logic here using formData state
    console.log(formData);
    dispatch(RequestConsent(formData)).then((res) => {
      console.log(res);
    });
    // Reset form data after submission
    setFormData({
      purpose_code:"",
      abha: "",
      docName: user.docName,
      docID: user.docID,
      report_type: [],
      from_date: "",
      to_date: "",
    });
  };

  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        {/* ************************************ */}

        <div className={styles_global.AfterSideBar}>
          {user !== null && user.userType === "doctor" && (
            <div className={"Payment_Page"}>
              <h1 style={{ marginBottom: "2rem" }}>Get Patient Consent</h1>
              <div className={"inputdiv"}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="option1"
                    onClick={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Previously Collected Records
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultChecked
                    value="option2"
                    onClick={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Get consent for inter records
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="option3"
                    onClick={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Show transferred Records
                  </label>
                </div>
              </div>
              <div>
                {selectedOption === "option1" && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Patient ID to search"
                  />
                )}
                {selectedOption === "option2" && (
                  <>
                    <div className={styles_global.AfterSideBar}>
                      <div className={"Payment_Page"}>
                        <h1 style={{ marginBottom: "2rem" }}>Consent Details</h1>
                        {user !== null && user.userType === "doctor" && (
                          <form onSubmit={handleSubmit}>
                            <div>
                              <label htmlFor="purpose">Purpose of Consent</label>
                              <input
                                type="text"
                                id="purpose_code"
                                name="purpose_code"
                                value={formData.purpose_code}
                                onChange={handleInputChangeForm}
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="name">Enter ABHA ID</label>
                              <input
                                type="text"
                                id="abha"
                                name="abha"
                                value={formData.abha}
                                onChange={handleInputChangeForm}
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="email">Records to be fetched from:</label>
                              <input
                                type="date"
                                id="from_date"
                                name="from_date"
                                value={formData.from_date}
                                onChange={handleInputChangeForm}
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="phone">Records to be fetched upto:</label>
                              <input
                                type="date"
                                id="to_date"
                                name="to_date"
                                value={formData.to_date}
                                onChange={handleInputChangeForm}
                                required
                              />
                            </div>
          
                            <button
                              className={"formsubmitbutton bookingbutton"}
                              type="submit"
                            >
                              Submit
                            </button>
                          </form>
                        )}
                        {user === null && <div>Not Authorised</div>}
                        {user !== null && user.userType !== "doctor" && (
                          <div>Not Authorised</div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {selectedOption === "option3" && (
                  <>
                    <div className={styles_global.AfterSideBar}>
                      <div className={"Payment_Page"}>
                        <h1 style={{ marginBottom: "2rem" }}>Previous Encounters</h1>
                        <Table columns={columns} dataSource={records} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/*<div>
                <button
                  className={"formsubmitbutton bookingbutton"}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                </div>*/}
            </div>

          )}
          {user === null && <div>Not Authorised</div>}
          {user !== null && user.userType !== "doctor" && (
            <div>Not Authorised</div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterRecords;
