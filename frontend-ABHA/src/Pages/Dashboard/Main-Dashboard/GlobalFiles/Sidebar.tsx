import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GiNurseFemale } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHospitalUser } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { RiClipboardFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CommonCSS.module.css";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div>
        <div
          style={{ width: isOpen ? "200px" : "70px" }}
          className={styles["sidebar"]}
        >
          <div className={styles["top_section"]}>
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className={styles["logo"]}
            >
              HMS
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className={styles["bars"]}
            >
              <ImMenu onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className={styles["bottomSection"]}>
            {user?.userType === "frontdesk" ||
            user?.userType === "doctor" ||
            user?.userType === "admin" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/dashboard"}
              >
                <div className={styles["icon"]}>
                  <MdDashboardCustomize className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  DashBoard
                </div>
              </Link>
            ) : null}

            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/frontdeskprofile"}
              >
                <div className={styles["icon"]}>
                  <CgProfile className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Profile
                </div>
              </Link>
            ) : null}
            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/addpatient"}
              >
                <div className={styles["icon"]}>
                  <FaHospitalUser className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add Patient
                </div>
              </Link>
            ) : null}
            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/addpatientabha"}
              >
                <div className={styles["icon"]}>
                  <FaHospitalUser className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add Patient via ABHA
                </div>
              </Link>
            ) : null}
            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/patientdetails"}
              >
                <div className={styles["icon"]}>
                  <TbListDetails className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Patients
                </div>
              </Link>
            ) : null}
            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/bookappointment"}
              >
                <div className={styles["icon"]}>
                  <BsBookmarkPlus className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Appointments
                </div>
              </Link>
            ) : null}
            {user?.userType === "frontdesk" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/registerviaabha"}
              >
                <div className={styles["icon"]}>
                  <BsBookmarkPlus className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Register/Book via ABHA
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/addoctor"}
              >
                <div className={styles["icon"]}>
                  <AiOutlineUserAdd className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add Doctor
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/addfrontdesk"}
              >
                <div className={styles["icon"]}>
                  <GiNurseFemale className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add to FrontDesk
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/admin"}
              >
                <div className={styles["icon"]}>
                  <RiAdminLine
                    className={styles["mainIcon"]}
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add Admin
                </div>
              </Link>
            ) : null}

            {/*user?.userType === "admin" ? (
              <Link className="link" activeclassname="active" to={"/addbeds"}>
                <div className="icon">
                  <TbBed className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add Beds
                </div>
              </Link>
            ) : null*/}

            {/*user?.userType === "admin" ? (
              <Link
                className="link"
                activeclassname="active"
                to={"/addambulance"}
              >
                <div className="icon">
                  <FaAmbulance className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add AMBU
                </div>
              </Link>
            ) : null*/}
            {/* {user?.userType === "admin" ? (
              <Link
                className="link"
                activeclassname="active"
                to={"/checkpayment"}
              >
                <div className="icon">
                  <RiSecurePaymentLine className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Payments
                </div>
              </Link>
            ) : null} */}

            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/doctorprofile"}
              >
                <div className={styles["icon"]}>
                  <SlUserFollow className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Profile
                </div>
              </Link>
            ) : null}
            {/*<Link className="link" activeclassname="active" to={"/rooms"}>
              <div className="icon">
                <MdBedroomChild className="mainIcon" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Beds
              </div>
            </Link>*/}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/reports"}
              >
                <div className={styles["icon"]}>
                  <TbReportMedical className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Reports
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/checkappointment"}
              >
                <div className={styles["icon"]}>
                  <BsFillBookmarkCheckFill className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Appointments
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/createslip"}
              >
                <div className={styles["icon"]}>
                  <BiDetail className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Create Report
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/patientdetails"}
              >
                <div className={styles["icon"]}>
                  <TbListDetails className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Patients
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/carecontext"}
              >
                <div className={styles["icon"]}>
                  <RiClipboardFill className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Add Care Context
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className={styles["link"]}
                activeclassname="active"
                to={"/interrecords"}
              >
                <div className={styles["icon"]}>
                  <RiClipboardFill className={styles["mainIcon"]} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles["link_text"]}
                >
                  Inter Records
                </div>
              </Link>
            ) : null}

            <Link
              className={`${styles.LogOutPath} ${styles.link}`}
              onClick={() => {
                dispatch({ type: "AUTH_LOGOUT" });
              }}
              to={"/"}
            >
              <div className={styles["icon"]}>
                <FiLogOut />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className={styles["link_text"]}
              >
                {user !== null && user.userType !== "patient"
                  ? "Logout"
                  : "Login Page"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
