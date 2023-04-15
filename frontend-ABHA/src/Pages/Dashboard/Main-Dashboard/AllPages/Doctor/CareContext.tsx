import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../GlobalFiles/Sidebar";
import { AddCareContext } from "../../../../../Redux/Datas/action";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";

const CareContext = () => {
  const dispatch = useDispatch();
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    abha: "",
    display1: "",
    display2: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here using formData state
    console.log(formData);
    dispatch(AddCareContext(formData)).then((res) => {
      console.log(res);
    });
    // Reset form data after submission
    setFormData({
      abha: "",
      display1: "",
      display2: "",
      message: "",
    });
  };
  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        {/* ************************************ */}

        <div className={styles_global.AfterSideBar}>
          <div className={"Payment_Page"}>
            <h1 style={{ marginBottom: "2rem" }}>Add Care Context</h1>
            {user !== null && user.userType === "doctor" && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Enter ABHA ID</label>
                  <input
                    type="text"
                    id="abha"
                    name="abha"
                    value={formData.abha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">DIsplay Label</label>
                  <input
                    type="text"
                    id="display1"
                    name="display1"
                    value={formData.display1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Remarks About Visit</label>
                  <input
                    type="text"
                    id="display2"
                    name="display2"
                    value={formData.display2}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Extra Remarks</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button
                  className={"formsubmitbutton bookingbutton"}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {user === null && <div>Not Authorised</div>}
            {user !== null && user.userType !== "doctor" && (
              <div>Not Authorised</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareContext;
