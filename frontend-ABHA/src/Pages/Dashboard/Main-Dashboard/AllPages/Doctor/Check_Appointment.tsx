import { Table } from "antd";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  DeleteAppointment,
  GetAllAppointment,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import Report_PopUp from "./Report_PopUp";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";
import "./CSS/Report.css";

const Check_Appointment = () => {
  const { data } = useSelector((store) => store.auth);

  const disptach = useDispatch();

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }
  if (data?.user === null) {
    return <Navigate to={"/dashboard"} />;
  }
  if (data?.user !== null && data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
  const [showPopup, setShowPopup] = useState(false);
  const [showRecord, setShowRecord] = useState(null);
  const handleButtonClick = (record) => {
    console.log(record);
    const payLoad = {
      patient_id: record.patientID,
      visit_id: record.visitID,
      doc_id: record.docID,
    };
    setShowRecord(payLoad);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowRecord(null);
  };

  const columns = [
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Resolve",
      key: "Delete",
      render: (text, record) => (
        <>
          <button
            style={{
              border: "none",
              color: "red",
              outline: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={() => DeleteAppoint(record._id)}
          >
            Delete
          </button>
          <br />
          <br />
          <button
            className="custom-btn btn-3"
            onClick={() => handleButtonClick(record)}
          >
            <span>Create Record</span>
          </button>
        </>
      ),
    },
  ];

  const AllAppointment = useSelector((state) => state.data.Appointments);

  const DeleteAppoint = (id) => {
    disptach(DeleteAppointment(id));
  };
  useEffect(() => {
    disptach(GetAllAppointment());
  }, []);

  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />
        <div className={styles_global.AfterSideBar}>
          <div className={"Payment_Page"}>
            <h1 style={{ marginBottom: "2rem" }}>Appointment Details</h1>
            <div className={styles.patientBox}>
              {
                <Table
                  columns={columns}
                  dataSource={AllAppointment.filter(
                    (row) => row.docID === data?.user.docID
                  )}
                />
              }

              <Modal isOpen={showPopup} ariaHideApp={false}>
                <Report_PopUp
                  patient_id={showRecord?.patient_id}
                  visit_id={showRecord?.visit_id}
                  doc_id={showRecord?.doc_id}
                  onClose={handleClosePopup}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Check_Appointment;
