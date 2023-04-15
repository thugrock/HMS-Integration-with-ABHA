import React, { useState } from "react";
import "./CSS/Add_Doctor.css";
import nurse from "../../../../../img/nurseavatar.png";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  FrontDeskRegister,
  SendPassword,
} from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import "./CSS/Add_Doctor.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
const notify = (text) => toast(text);

const Add_FrontDesk = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const InitData = {
    frontDeskID: Date.now(),
    abhaID: "",
    frontDeskName: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    DOB: "",
    gender: "",
    bloodGroup: "",
    department: "",
    joining_date: "",
    education: "",
    shift_start: "",
    shift_end: "",
    details: "",
  };
  const [FrontDeskValue, setFrontDeskValue] = useState(InitData);

  const HandleFrontDeskChange = (e) => {
    setFrontDeskValue({ ...FrontDeskValue, [e.target.name]: e.target.value });
  };

  const HandleFrontDeskSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(FrontDeskRegister(FrontDeskValue)).then((res) => {
      if (res.message === "FrontDesk Member already exists") {
        setLoading(false);
        return notify("FrontDesk Member Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }
      notify("FrontDesk Member Added");

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.nurseID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setLoading(false);
      setFrontDeskValue(InitData);
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
      <div className={styles_global["container"]}>
        <Sidebar />
        <div className={styles_global["AfterSideBar"]}>
          <div className="Main_Add_Doctor_div">
            <h1>Add FrontDesk</h1>
            <img src={nurse} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleFrontDeskSubmit}>
              <div>
                <label> Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="frontDeskName"
                    value={FrontDeskValue.frontDeskName}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.abhaID}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.mobile}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.email}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.address}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.password}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.DOB}
                    onChange={HandleFrontDeskChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={FrontDeskValue.gender}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.bloodGroup}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.department}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.joining_date}
                    onChange={HandleFrontDeskChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.B.Pharmacy"
                    name="education"
                    value={FrontDeskValue.education}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.shift_start}
                    onChange={HandleFrontDeskChange}
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
                    value={FrontDeskValue.shift_end}
                    onChange={HandleFrontDeskChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Other Info</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={FrontDeskValue.details}
                    onChange={HandleFrontDeskChange}
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

export default Add_FrontDesk;
