import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../img/Assets/logo (1) (2).png";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

function NavBars() {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <div className="navStick">
      <ToastContainer />
      <Navbar expand="lg">
        <Container fluid>
          <Link to={"/"} className="navbar-brand">
            <img src={Logo} title="logo" alt="img" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/ourteam"} className="nav-link">
                Doctors
              </Link>
              {/*
              <NavDropdown title="About us" id="basic-nav-dropdown">
                <Link to={"/team"} className="dropdown-item">
                  Creators
                </Link>
                <Link to={"/service"} className="dropdown-item">
                  Services
                </Link>
  </NavDropdown>*/}
              <Link to={"/booking"} className="nav-link">
                Booking
              </Link>
              {data?.isAuthenticated ? (
                <Link
                  to=""
                  className="nav-link"
                  onClick={() => {
                    dispatch({ type: "AUTH_LOGOUT" });
                    notify("Logged out");
                  }}
                >
                  Logout
                </Link>
              ) : (
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <Link to={"/login"} className="dropdown-item">
                    Patient
                  </Link>
                  <Link to="/dLogin" className="dropdown-item">
                    Staff
                  </Link>
                </NavDropdown>
              )}
              <Link to="/Report" className="nav-link">
                <button type="button">
                  Report
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBars;
