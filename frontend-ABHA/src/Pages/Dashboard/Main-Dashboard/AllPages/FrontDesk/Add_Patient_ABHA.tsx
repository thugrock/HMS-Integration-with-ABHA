import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import {
  Registerviaabha,
  Registerviaabha_OTP,
} from "../../../../../Redux/Datas/action";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";

const Add_Patient_ABHA = () => {
  const dispatch = useDispatch();
  const [init, setInit] = useState(true);

  const [formData, setFormData] = useState({
    abha: "",
    purpose: "KYC",
  });

  const InitData = {
    otp: "",
    callType: "addbyabha",
    patientID: Date.now(),
    bloodGroup: "",
    email: "",
    mobile: "",
    password: "",
    details: "",
    date: "",
  };
  const [formData_otp, setFormData_OTP] = useState(InitData);
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
      abha: "",
      purpose: "KYC",
    });
    setInit(!init);
  };
  const handleSubmit_OTP = (e) => {
    e.preventDefault();
    // Perform form submission logic here using formData state
    console.log(formData_otp);
    dispatch(Registerviaabha_OTP(formData_otp)).then((res) => {
      console.log(res);
    });
    // Reset form data after submission
    setFormData_OTP({
      otp: "",
      callType: "addbyabha",
      patientID: Date.now(),
      bloodGroup: "",
      email: "",
      mobile: "",
      password: "",
      details: "",
      date: "",
    });
    setInit(!init);
  };
  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        <div className={styles_global.AfterSideBar}>
          <div className={"Payment_Page"}>
            <h1 style={{ marginBottom: "2rem" }}>Add Patient Via ABHA</h1>
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
                  <label>Patient Blood Group</label>
                  <div className="inputdiv">
                    <select
                      name="bloodGroup"
                      onChange={handleInputChange_OTP}
                      required
                    >
                      <option value="">Select</option>
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

                {/* PASSWORD*/}
                <div className="dateofAppointment">
                  <p>Password</p>
                  <div className="inputdiv">
                    <input
                      type={"password"}
                      placeholder="Password"
                      name="password"
                      value={formData_otp.password}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Contact Number</label>
                  <div className="inputdiv">
                    <input
                      type="number"
                      placeholder="Number"
                      name="mobile"
                      value={formData_otp.mobile}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <div className="inputdiv">
                    <input
                      type="email"
                      placeholder="abc@abc.com"
                      name="email"
                      value={formData_otp.email}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Date</label>
                  <div className="inputdiv">
                    <input
                      type="date"
                      placeholder="yyyy:mm:dd"
                      name="date"
                      value={formData_otp.date}
                      onChange={handleInputChange_OTP}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Details</label>
                  <div className="inputdiv">
                    <input
                      type="text"
                      placeholder="Details"
                      name="details"
                      value={formData_otp.details}
                      onChange={handleInputChange_OTP}
                      required
                    />
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

export default Add_Patient_ABHA;
