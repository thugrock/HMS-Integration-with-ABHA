import React, { useState } from "react";
import "./CSS/Add_Doctor.css";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { DoctorRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import "./CSS/Add_Doctor.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
const notify = (text) => toast(text);

const AddDoctor = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initData = {
    docID: Date.now(),
    abhaID: "",
    docName: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    DOB: "",
    gender: "",
    bloodGroup: "",
    department: "",
    joining_date: "",
    specialization: "",
    shift_start: "",
    shift_end: "",
    details: "",
  };
  const [DoctorValue, setDoctorValue] = useState(initData);

  const HandleDoctorChange = (e) => {
    setDoctorValue({ ...DoctorValue, [e.target.name]: e.target.value });
  };

  const HandleDoctorSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(DoctorRegister(DoctorValue)).then((res) => {
      if (res.message === "Doctor already exists") {
        setLoading(false);
        return notify("Doctor Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.docID,
      };
      console.log(data, "DOCTOR REGISTER SUCCESSFULLY");
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setLoading(false);
      setDoctorValue(initData);
    });
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className={styles_global.container}>
        <Sidebar />
        <div className={styles_global.AfterSideBar}>
          <div className="Main_Add_Doctor_div">
            <h1>Add Doctors</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDoctorSubmit}>
              <div>
                <label>Doctor Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="docName"
                    value={DoctorValue.docName}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>ABHA ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ABHA ID"
                    name="abhaID"
                    value={DoctorValue.abhaID}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Contact Number"
                    name="mobile"
                    value={DoctorValue.mobile}
                    onChange={HandleDoctorChange}
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
                    value={DoctorValue.email}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Address</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={DoctorValue.address}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={DoctorValue.password}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Birthdate</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="DOB"
                    value={DoctorValue.DOB}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={DoctorValue.gender}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="bloodGroup"
                    value={DoctorValue.bloodGroup}
                    onChange={HandleDoctorChange}
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
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={DoctorValue.department}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="General">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Joining Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="joining_date"
                    value={DoctorValue.joining_date}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Specialization</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.MBBS, P.G"
                    name="specialization"
                    value={DoctorValue.specialization}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Shift Start</label>
                <div className="inputdiv">
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="shift_start"
                    value={DoctorValue.shift_start}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Shift End</label>
                <div className="inputdiv">
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="shift_end"
                    value={DoctorValue.shift_end}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Other Details</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={DoctorValue.details}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
