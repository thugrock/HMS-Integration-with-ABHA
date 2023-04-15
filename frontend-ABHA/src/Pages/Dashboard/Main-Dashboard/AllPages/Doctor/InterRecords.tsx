import { Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReports } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import styles from "./CSS/Doctor_Profile.module.css";
import styles_global from "../../GlobalFiles/CommonCSS.module.css";
import "../Admin/CSS/Payment.css";

const InterRecords = () => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.value);
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    // Navigate to other page using history.push('/other-page')
    navigate("/other-page");
  };

  return (
    <>
      <div className={styles_global.container}>
        <Sidebar />

        {/* ************************************ */}

        <div className={styles_global.AfterSideBar}>
          {user !== null && user.userType === "doctor" && (
            <div className={"Payment_Page"}>
              <h1 style={{ marginBottom: "2rem" }}>Inter Records Section</h1>
              <div className={"inputdiv"}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="option1"
                    onClick={handleOptionChange}
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Previously Collected Records
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    defaultChecked
                    value="option2"
                    onClick={handleOptionChange}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Get consent for inter records
                  </label>
                </div>
              </div>
              <div>
                {selectedOption === "option1" && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Patient ID to search"
                  />
                )}
                {selectedOption === "option2" && (
                  <>
                    <div>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter Patients ABHA ID"
                      />
                    </div>
                    <div>
                      <label>Records From</label>
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        name="fromdate"
                        value={"fromdate"}
                      />
                    </div>
                    <div>
                      <label>Records To</label>
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        name="todate"
                        value={"todate"}
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <button
                  className={"formsubmitbutton bookingbutton"}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {user === null && <div>Not Authorised</div>}
          {user !== null && user.userType !== "doctor" && (
            <div>Not Authorised</div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterRecords;
