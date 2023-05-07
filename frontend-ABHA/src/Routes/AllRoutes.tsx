import React from "react";
import { Route, Routes } from "react-router-dom";

import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";
import Add_Admin from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Admin";
import AddDoctor from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Doctor";
import Add_FrontDesk from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_FrontDesk";
import AllReport from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/AllReport";
import Check_Appointment from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Check_Appointment";
import Discharge_and_Create_Slip from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Discharge_and_Create_Slip";
import Doctor_Profile from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Doctor_Profile";
import Patient_Details from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Patient_Details";
import InterRecords from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/InterRecords";
import CareContext from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/CareContext";
import Add_Patient from "../Pages/Dashboard/Main-Dashboard/AllPages/FrontDesk/Add_Patient";
import Add_Patient_ABHA from "../Pages/Dashboard/Main-Dashboard/AllPages/FrontDesk/Add_Patient_ABHA";
import Book_Appointment from "../Pages/Dashboard/Main-Dashboard/AllPages/FrontDesk/Book_Appointment";
import FrontDeskProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/FrontDesk/FrontDesk_Profile";
import RegisterviaABHA from "../Pages/Dashboard/Main-Dashboard/AllPages/FrontDesk/RegisterviaABHA";
import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";

import Home from "../Components/Patient/home";
import About from "../Components/Patient/about";
import OurTeam from "../Components/Patient/ourteam";
import Booking from "../Components/Patient/booking";
import NotFound from "../Components/Patient/notfound";
import Login from "../Components/Patient/login";
import Service from "../Components/Patient/service";
import Report from "../Components/Patient/Report";
import Consents from "../Components/Patient/consent";

import Team from "../Sections/Team";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<FrontPage />} />
        <Route path="/dLogin" element={<DLogin />} />
        ******************** Admin Part*************************
        <Route path="/addoctor" element={<AddDoctor />} />
        <Route path="/addfrontdesk" element={<Add_FrontDesk />} />
        <Route path="/admin" element={<Add_Admin />} />
        ******************** Doctor Part *************************
        <Route path="/reports" element={<AllReport />} />
        <Route path="/checkappointment" element={<Check_Appointment />} />
        <Route path="/createslip" element={<Discharge_and_Create_Slip />} />
        <Route path="/patientdetails" element={<Patient_Details />} />
        <Route path="/doctorprofile" element={<Doctor_Profile />} />
        <Route path="/interrecords" element={<InterRecords />} />
        <Route path="/carecontext" element={<CareContext />} />
        ******************** FrontDesk Part *************************
        <Route path="/addpatient" element={<Add_Patient />} />
        <Route path="/addpatientabha" element={<Add_Patient_ABHA />} />
        <Route path="/bookappointment" element={<Book_Appointment />} />
        <Route path="/frontdeskprofile" element={<FrontDeskProfile />} />
        <Route path="/registerviaabha" element={<RegisterviaABHA />} />
        ******************** Patient *************************
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/getConsents" element={<Consents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
