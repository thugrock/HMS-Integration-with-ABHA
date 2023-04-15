import { Table } from "antd";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
import styles from "./CommonCSS.module.css";

const FrontPage = () => {
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "ABHA", dataIndex: "abhaID", key: "abhaID" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const { patients } = useSelector((store) => store.data.patients);

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, []);
  const tableStyle = {
    backgroundColor: "rgb(75, 42, 194)",
    border: "1px solid #ccc",
    /* add other custom styles as needed */
  };

  return (
    <div className={styles["container"]}>
      <Sidebar />
      <div className={styles["AfterSideBar"]}>
        {user !== null && user.userType !== "patient" ? (
          <h1 style={{ color: "rgb(75, 42, 194)" }}>Overview</h1>
        ) : (
          <h1 style={{ color: "rgb(75, 42, 194)" }}>Not Authorised</h1>
        )}
        {user !== null && user.userType !== "patient" ? (
          <div className={styles["maindiv"]}>
            <div className={`${styles.one} ${styles.commondiv}`}>
              <div>
                <h1>{data?.doctor}</h1>
                <p>Doctor</p>
              </div>
              <MdPersonAdd className={styles["overviewIcon"]} />
            </div>
            <div className={`${styles.two} ${styles.commondiv}`}>
              {" "}
              <div>
                <h1>{data?.frontdesk}</h1>
                <p>FrontDesk</p>
              </div>
              <FaUserNurse className={styles["overviewIcon"]} />
            </div>
            <div className={`${styles.three} ${styles.commondiv}`}>
              <div>
                <h1>{data?.patient}</h1>
                <p>Patient</p>
              </div>
              <RiEmpathizeLine className={styles["overviewIcon"]} />
            </div>
            <div className={`${styles.four} ${styles.commondiv}`}>
              {" "}
              <div>
                <h1>{data?.admin}</h1>
                <p>Admin</p>
              </div>
              <RiAdminLine className={styles["overviewIcon"]} />
            </div>
            {/*<div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.bed}</h1>
              <p>Beds</p>
            </div>
            <FaBed className="overviewIcon" />
          </div>*/}

            {/*<div className="five commondiv">
            {" "}
            <div>
              <h1>{data?.ambulance}</h1>
              <p>Ambulance</p>
            </div>
            <FaAmbulance className="overviewIcon" />
          </div>*/}
            <div className={`${styles.five} ${styles.commondiv}`}>
              {" "}
              <div>
                <h1>{data?.appointment}</h1>
                <p>Appointment</p>
              </div>
              <BsFillBookmarkCheckFill className={styles["overviewIcon"]} />
            </div>
            <div className={`${styles.six} ${styles.commondiv}`}>
              {" "}
              <div>
                <h1>{data?.report}</h1>
                <p>Reports</p>
              </div>
              <MdPayment className={styles["overviewIcon"]} />
            </div>
          </div>
        ) : null}
        {/* ************************************* */}
        {user !== null &&
        (user.userType === "frontdesk" || user.userType === "admin") ? (
          <div className={styles["patientDetails"]}>
            <h1>Patient Details</h1>
            <div className={styles["patientBox"]}>
              <Table
                style={tableStyle}
                columns={columns}
                dataSource={patients}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FrontPage;
