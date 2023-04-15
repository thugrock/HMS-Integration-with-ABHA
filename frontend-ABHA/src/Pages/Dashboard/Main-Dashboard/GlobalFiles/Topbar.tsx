import React, { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { ImMenu } from "react-icons/im";

import styles from "./CommonCSS.module.css";
const Topbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
    console.log(term);
  };

  return (
    <>
      <div className={styles["MainDiv"]}>
        <div className={styles["Hideshow"]}>
          <h2>HMS</h2>
        </div>
        <div className={styles["SearchDiv"]}>
          <input
            type="text"
            placeholder="Search Patient By Health Id...."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className={styles["IconsDiv"]}>
          <FaUserMd className={`${styles.Icons} ${styles.user}`} />
        </div>
      </div>
    </>
  );
};

export default Topbar;
