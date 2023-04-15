import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import admin from "../../../../../img/admin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);
import "./CSS/Add_Doctor.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
const Add_Admin = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setloading] = useState(false);

  const InitData = {
    adminID: Date.now(),
    abhaID: "",
    adminName: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    DOB: "",
    gender: "",
    blood_group: "",
    joining_date: "",
    education: "",
  };
  const [AdminValue, setAdminValue] = useState(InitData);

  const HandleAdminChange = (e) => {
    setAdminValue({ ...AdminValue, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const HandleAdminSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AdminRegister(AdminValue)).then((res) => {
      if (res.message === "Admin already exists") {
        setloading(false);
        return notify("Admin Already Exist");
      }
      if (res.message === "error") {
        setloading(false);
        return notify("Something went wrong, Please try Again");
      }
      notify("Admin Added");

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.adminID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setloading(false);
      setAdminValue(InitData);
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
            <h1>Add Admin</h1>
            <img src={admin} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleAdminSubmit}>
              <div>
                <label>Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="adminName"
                    value={AdminValue.adminName}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.abhaID}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.mobile}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.email}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.address}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.password}
                    onChange={HandleAdminChange}
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
                    value={AdminValue.DOB}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AdminValue.gender}
                    onChange={HandleAdminChange}
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
                    name="blood_group"
                    value={AdminValue.blood_group}
                    onChange={HandleAdminChange}
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
                <label>Joining Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="joining_date"
                    value={AdminValue.joining_date}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.Network Engineer, Record Manager"
                    name="education"
                    value={AdminValue.education}
                    onChange={HandleAdminChange}
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

export default Add_Admin;
