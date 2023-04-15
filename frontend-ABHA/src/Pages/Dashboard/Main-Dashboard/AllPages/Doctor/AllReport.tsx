import React from "react";
import { Table } from "antd";
import Modal from "react-modal";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllReports,
  GetDoctorDetails,
  GetPatients,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import Detailed_Report from "./Detailed_Report";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";
const AllReport = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [Report, setReport] = useState("");
  const [Patients, setPatients] = useState([]);
  const [Doctors, setDoctors] = useState([]);

  let merged = [];
  const [payload, setpayload] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [showRecord, setShowRecord] = useState(null);
  const handleButtonClick = (record) => {
    console.log(record);
    setShowRecord(record);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const columns = [
    { title: "Patient ID", dataIndex: "patientID", key: "patientID" },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Consultation ID", dataIndex: "visitID", key: "visitID" },
    { title: "Disease", dataIndex: "patientDisease", key: "patientDisease" },
    {
      title: "Temperature",
      dataIndex: "patientTemperature",
      key: "patientTemperature",
    },
    { title: "BP", dataIndex: "patientBP", key: "patientBP" },
    {
      title: "Date of Visit",
      dataIndex: "visit_printabble",
      key: "visit_printabble",
    },
    {
      title: "Date of Report",
      dataIndex: "createdAt_printabble",
      key: "createdAt_printabble",
    },
    {
      title: "Detailed Report",
      key: "detailed_report",
      render: (text, record) => (
        <>
          <button
            className="custom-btn btn-3"
            onClick={() => handleButtonClick(record)}
          >
            <span>View</span>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(GetPatients()).then((res) => {
      setPatients(res);
    });
    dispatch(GetAllReports()).then((res) => {
      setReport(res.filter((ele) => ele.docID === user.docID));
    });
    dispatch(GetDoctorDetails()).then((res) => {
      setDoctors(res);
    });
  }, []);
  useEffect(() => {
    if (Report) {
      console.log("Data has been fetched:", Report);
    }
    if (Patients) {
      console.log("Data has been fetched:", Patients);
    }
    if (Doctors) {
      console.log("Data has been fetched:", Doctors);
    }
    for (let i = 0; i < Report.length; i++) {
      merged.push({
        ...Report[i],
        ...Patients.patients.find(
          (itmInner) => itmInner.patientID === Report[i].patientID
        ),
        ...Doctors.find((itmInner) => itmInner.docID === Report[i].docID),
        patAbhaID: Patients.patients.find(
          (itmInner) => itmInner.patientID === Report[i].patientID
        ).abhaID,
        patDOB: Patients.patients.find(
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
    setpayload(merged);
  }, [Report, Patients, Doctors]);
  /*
  for (let i = 0; i < Report.length; i++) {
    merged.push({
      ...Report[i],
      ...Patients.patients.find(
        (itmInner) => itmInner.patientID === Report[i].patientID
      ),
    });

  }
  */
  console.log(payload);
  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        {/* ************************************ */}

        <div className={styles_global.AfterSideBar}>
          <div className={"Payment_Page"}>
            <h1 style={{ marginBottom: "2rem" }}>Patient's Reports</h1>
            <div className={styles_global.patientBox}>
              {user !== null && user.userType === "doctor" && (
                <Table columns={columns} dataSource={payload} />
              )}
              {user === null && <div>Not Authorised</div>}
              {user !== null && user.userType !== "doctor" && (
                <div>Not Authorised</div>
              )}
              <Modal isOpen={showPopup} ariaHideApp={false}>
                <Detailed_Report
                  payload={showRecord}
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

export default AllReport;
