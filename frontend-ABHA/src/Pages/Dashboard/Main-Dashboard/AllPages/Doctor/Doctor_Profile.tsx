import React, { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import {
  UpdateDoctor,
  UpdateFrontDesk,
} from "../../../../../Redux/auth/action";
import { GetDoctorDetails } from "../../../../../Redux/Datas/action";
import { Navigate } from "react-router-dom";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
// *********************************************************
const Doctor_Profile = () => {
  const { data } = useSelector((store) => store.auth);

  const disptach = useDispatch();

  useEffect(() => {
    disptach(GetDoctorDetails());
  }, []);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user === null) {
    return <Navigate to={"/dashboard"} />;
  }
  if (data?.user !== null && data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
  const [formData, setFormData] = useState({
    docName: data.user.docName,
    age: data.user.age,
    gender: data.user.gender,
    bloodGroup: data.user.bloodGroup,
    education: data.user.education,
    mobile: data.user.mobile,
    DOB: data.user.DOB,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    disptach(UpdateDoctor(formData, data.user._id));
    success("user updated");
    handleOk();
  };

  return (
    <>
      {contextHolder}
      <div className={styles_global["container"]}>
        <Sidebar />
        <div className={styles_global["AfterSideBar"]}>
          <div className={styles["maindoctorProfile"]}>
            <div className={styles["firstBox"]}>
              <div>
                <img src={data?.user?.image} alt="docimg" />
              </div>
              <hr />
              <div className={styles["singleitemdiv"]}>
                <GiMeditation className={styles["singledivicons"]} />
                <p>{data?.user?.docName}</p>
              </div>
              <div className={styles["singleitemdiv"]}>
                <MdBloodtype className={styles["singledivicons"]} />
                <p>{data?.user?.bloodGroup}</p>
              </div>
              <div className={styles["singleitemdiv"]}>
                <FaBirthdayCake className={styles["singledivicons"]} />
                <p>{data?.user?.DOB}</p>
              </div>
              <div className={styles["singleitemdiv"]}>
                <BsFillTelephoneFill className={styles["singledivicons"]} />
                <p>{data?.user?.mobile}</p>
              </div>
              <div className={styles["singleitemdiv"]}>
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit profile
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className={"inputForm"}>
                  <input
                    name="docName"
                    value={formData.docName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Full name"
                  />
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Age"
                  />
                  <select name="gender" onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                  <input
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Blood Group"
                  />
                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="education"
                  />
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="mobile"
                  />
                  <input
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Date of birth"
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className={styles["SecondBox"]}>
              <div className={styles["subfirstbox"]}>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className={styles["singleitemdiv"]}>
                  <BsGenderAmbiguous className={styles["singledivicons"]} />
                  <p>{data?.user?.gender}</p>
                </div>
                <div className={styles["singleitemdiv"]}>
                  <AiFillCalendar className={styles["singledivicons"]} />
                  <p>{data?.user?.age}</p>
                </div>

                <div className={styles["singleitemdiv"]}>
                  <MdOutlineCastForEducation
                    className={styles["singledivicons"]}
                  />
                  <p>{data?.user?.education}</p>
                </div>
                <div className={styles["singleitemdiv"]}>
                  <BsHouseFill className={styles["singledivicons"]} />
                  <p>{data?.user?.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className={styles["subSecondBox"]}>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Hospital Details
                </h2>
                <div className={styles["singleitemdiv"]}>
                  <BiTime className={styles["singledivicons"]} />
                  <p>09:00 AM - 20:00 PM (TIMING)</p>
                </div>
                <div className={styles["singleitemdiv"]}>
                  <FaRegHospital className={styles["singledivicons"]} />
                  <p>SAVY hospitals</p>
                </div>
                <div className={styles["singleitemdiv"]}>
                  <FaMapMarkedAlt className={styles["singledivicons"]} />
                  <p>IIIT Bangalore.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor_Profile;
