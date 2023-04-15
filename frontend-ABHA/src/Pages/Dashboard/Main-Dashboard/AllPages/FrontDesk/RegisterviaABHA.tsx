import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import { CommonProblem } from "./MixedObjectData";
import { AddPatients, CreateBooking } from "../../../../../Redux/Datas/action";

import {
  Registerviaabha,
  Registerviaabha_OTP,
} from "../../../../../Redux/Datas/action";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";
const notify = (text) => toast(text);

const RegisterviaABHA = () => {
  const dispatch = useDispatch();
  const [init, setInit] = useState(true);

  const [formData, setFormData] = useState({
    abha: "",
    purpose: "KYC_AND_LINK",
  });
  const [formData_otp, setFormData_OTP] = useState({
    otp: "",
    abha: "",
    callType: "appointbyabha",
    mobile: "",
    email: "",
    disease: "",
    department: "",
    date: "",
    time: "",
    docID: "",
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setSelectedOption(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setInputValue("");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleInputChange_OTP = (e) => {
    const { name, value } = e.target;
    setFormData_OTP((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here using formData state
    console.log(formData);
    dispatch(Registerviaabha(formData)).then((res) => {
      console.log(res);
    });
    // Reset form data after submission
    setFormData({
      abha: formData.abha,
      purpose: "KYC_AND_LINK",
    });
    setInit(!init);
  };
  const handleSubmit_OTP = (e) => {
    e.preventDefault();
    // Perform form submission logic here using formData state
    console.log(formData_otp);
    setFormData_OTP({
      otp: formData_otp.otp,
      abha: formData.abha,
      callType: "appointbyabha",
      email: formData_otp.email,
      mobile: "",
      disease: formData_otp.disease,
      department: formData_otp.department,
      date: formData_otp.date,
      time: formData_otp.time,
      docID: formData_otp.docID,
    });

    dispatch(Registerviaabha_OTP(formData_otp)).then((res) => {
      console.log(res);
    });
    // Reset form data after submission
    setFormData({
      abha: "",
      purpose: "KYC_AND_LINK",
    });
    setFormData_OTP({
      otp: "",
      abha: "",
      callType: "appointbyabha",
      mobile: "",
      email: "",
      disease: "",
      department: "",
      date: "",
      time: "",
      docID: "",
    });
    setInit(!init);
  };
  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        <div className={styles_global.AfterSideBar}>
          <div className={"Payment_Page"}>
            <h1 style={{ marginBottom: "2rem" }}>Register/Book via ABHA</h1>
            {init && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Enter ABHA ID</label>
                  <input
                    type="text"
                    id="abha"
                    name="abha"
                    value={formData.abha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="purpose"
                    id="purpose"
                    value="LINK"
                    onClick={handleOptionChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    LINK
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="purpose"
                    id="purpose"
                    defaultChecked
                    value="KYC_AND_LINK"
                    onClick={handleOptionChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    KYC_AND_LINK
                  </label>
                </div>
                <button
                  className={"formsubmitbutton bookingbutton"}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {!init && (
              <form onSubmit={handleSubmit_OTP}>
                <div>
                  <label htmlFor="name">Enter OTP</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData_otp.otp}
                    onChange={handleInputChange_OTP}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <div className="inputdiv">
                    <input
                      type="email"
                      placeholder="example@email.com"
                      name="email"
                      value={formData_otp.email}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Mobile</label>
                  <div className="inputdiv">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      name="mobile"
                      value={formData_otp.mobile}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Type of Disease</label>
                  <div className="inputdiv">
                    <select
                      name="disease"
                      value={formData_otp.disease}
                      onChange={(e) => {
                        handleInputChange_OTP(e);
                      }}
                      required
                    >
                      <option value="Choose Blood Group">Select Disease</option>
                      {CommonProblem.map((ele, i) => {
                        return (
                          <option key={i} value={ele.title}>
                            {ele.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Department</label>
                  <div className="inputdiv">
                    <select
                      name="department"
                      value={formData_otp.department}
                      onChange={handleInputChange_OTP}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="ENT">ENT</option>
                    </select>
                  </div>
                </div>
                {/* APPOINTMENT DATE  */}
                <div className="dateofAppointment">
                  <p>Date and Time </p>
                  <div className="inputdiv">
                    <input
                      type={"date"}
                      placeholder="Choose Date"
                      name="date"
                      value={formData_otp.date}
                      onChange={handleInputChange_OTP}
                      required
                    />
                    <input
                      type={"time"}
                      placeholder="Choose Time"
                      name="time"
                      value={formData_otp.time}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Doctor</label>
                  <div className="inputdiv">
                    <select
                      name="docID"
                      value={formData_otp.docID}
                      onChange={handleInputChange_OTP}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1681145607852">Prabhas Raju</option>
                      <option value="1681146225349">Samantha</option>
                      <option value="1681160357330">Sandhya</option>
                    </select>
                  </div>
                </div>
                <button
                  className={"formsubmitbutton bookingbutton"}
                  type="submit"
                >
                  Submit
                </button>
                <Link
                  to="/dashboard"
                  className={"formsubmitbutton bookingbutton"}
                >
                  Home
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterviaABHA;
