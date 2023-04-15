import "./about.css";
import { FiHome } from "react-icons/fi";
import NavBars from "../../Sections/navbar";
import Footer from "../../Sections/footer";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import member1 from "../../img/Assets/member1.22ac1d59.jpg";
import member2 from "../../img/Assets/member2.d03a0686.jpg";
import member3 from "../../img/Assets/member3.0d822ecc.jpg";
import member4 from "../../img/Assets/member4.9045579a.jpg";
import member5 from "../../img/Assets/member5.24eb1821.jpg";
import member6 from "../../img/Assets/member6.be2a77ad.jpg";
import ToTop from "../../Sections/totop";
import { Link } from "react-router-dom";
import "../../index.css";

function OurTeam() {
  return (
    <div>
      <NavBars />
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Doctors</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>
                      <FiHome />
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Doctors
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6 mb-30">
            <div className="team-member">
              <div className="team-media">
                <img src={member4} alt="img" />
              </div>
              <div className="team-info">
                <div className="team-info-comntent">
                  <h4 className="title">Dr. Yashwant Polapragada</h4>
                  <span className="text-secondary">Cardiology</span>
                </div>
                <ul className="social-media">
                  <li>
                    <Link to="">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <FaLinkedin />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mb-30">
            <div className="team-member">
              <div className="team-media">
                <img src={member5} alt="img" />
              </div>
              <div className="team-info">
                <div className="team-info-comntent">
                  <h4 className="title">Dr. Vishnu Reddy Dakkali</h4>
                  <span className="text-secondary">Neurology</span>
                </div>
                <ul className="social-media">
                  <li>
                    <Link to="">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <FaLinkedin />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<Footer />*/}
      <ToTop />
    </div>
  );
}

export default OurTeam;
