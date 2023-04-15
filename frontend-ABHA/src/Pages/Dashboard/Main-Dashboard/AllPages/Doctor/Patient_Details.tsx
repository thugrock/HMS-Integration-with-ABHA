import { Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import Topbar from "../../GlobalFiles/Topbar";
import styles from "./CSS/Doctor_Profile.module.css";
import "../Admin/CSS/Payment.css";

import styles_global from "../../GlobalFiles/CommonCSS.module.css";
const Patient_Details = () => {
  const { data } = useSelector((store) => store.auth);
  const { patients } = useSelector((store) => store.data.patients);

  const [rows, setRows] = useState(patients);

  const filterRows = (searchTerm) => {
    const filteredRows = patients.filter((row) =>
      searchTerm ? String(row.patientID).startsWith(String(searchTerm)) : true
    );
    console.log(filteredRows);
    setRows(filteredRows);
  };

  const columns = [
    { title: "ID", dataIndex: "patientID", key: "patientID" },
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "DOB", dataIndex: "DOB", key: "DOB" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Mobile No", dataIndex: "mobile", key: "mobile" },
  ];

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user === null) {
    return <Navigate to={"/dashboard"} />;
  }
  if (data?.user !== null && data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />
        <div className={styles_global.AfterSideBar}>
          <Topbar onSearch={filterRows} />
          <div className={"Payment_Page"}>
            {/* <h1 style={{ marginBottom: "2rem" }}>Patient Details</h1> */}
            <div className={styles_global.patientBox}>
              {<Table columns={columns} dataSource={rows} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient_Details;
