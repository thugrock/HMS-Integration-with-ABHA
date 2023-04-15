import React, { useState } from "react";
import { CommonProblem } from "./MixedObjectData";
import "./CSS/Book_appointment.css";
import { useDispatch } from "react-redux";
import { AddPatients, CreateBooking } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Admin/CSS/Add_Doctor.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";

const notify = (text) => toast(text);

const Book_Appointment = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const InitValue = {
    patientName: "",
    abhaID: "",
    DOB: "",
    mobile: "",
    email: "",
    address: "",
    disease: "",
    department: "",
    date: "",
    time: "",
    gender: "",
    docID: "",
  };

  const [BookAppoint, setBookAppoint] = useState(InitValue);

  const HandleAppointment = (e) => {
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    if (
      BookAppoint.gender === "" ||
      BookAppoint.mobile === "" ||
      BookAppoint.email === "" ||
      BookAppoint.department === ""
    ) {
      return notify("Please fill all the Details");
    }
    setLoading(true);
    dispatch(AddPatients({ ...BookAppoint, patientID: Date.now() })).then(
      (res) => {
        console.log(res);
        let data = {
          ...BookAppoint,
          patientID: res.id,
        };
        dispatch(CreateBooking(data));
        notify("Appointment Booked");
        setLoading(false);
        setBookAppoint(InitValue);
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className={styles_global["container"]}>
        <Sidebar />
        <div className={styles_global["AfterSideBar"]}>
          <div className="Main_Add_Doctor_div">
            <h1>Book Appointment</h1>
            <form onSubmit={HandleOnsubmitAppointment}>
              {/* Name PlaceHolder */}
              <div>
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="patientName"
                    value={BookAppoint.patientName}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* ABHA PLACEHOLDER  */}
              <div>
                <label>ABHA ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ABHA ID"
                    name="abhaID"
                    value={BookAppoint.abhaID}
                    onChange={HandleAppointment}
                  />
                </div>
              </div>
              {/* MOBILE PLACEHOLDER */}
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Number"
                    name="mobile"
                    value={BookAppoint.mobile}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={BookAppoint.email}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* ADDRESS SECTION  */}
              <div>
                <label>Address</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Address line 1"
                    name="address"
                    value={BookAppoint.address}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* PROBLEM PLACEHOLDER */}
              <div>
                <label>Type of Disease</label>
                <div className="inputdiv">
                  <select
                    name="disease"
                    value={BookAppoint.disease}
                    onChange={(e) => {
                      HandleAppointment(e);
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
              {/* DEPARTMENT SECTION */}

              <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={BookAppoint.department}
                    onChange={HandleAppointment}
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
                    value={BookAppoint.date}
                    onChange={HandleAppointment}
                    required
                  />
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="time"
                    value={BookAppoint.time}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/* GENDER PLACEHOLDER  */}
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={BookAppoint.gender}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="Choose Blood Group">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Doctor</label>
                <div className="inputdiv">
                  <select
                    name="docID"
                    value={BookAppoint.docID}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1681145607852">Prabhas Raju</option>
                    <option value="1681146225349">Samantha</option>
                    <option value="1681160357330">Sandhya</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="book_formsubmitbutton">
                {Loading ? "Loading..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
