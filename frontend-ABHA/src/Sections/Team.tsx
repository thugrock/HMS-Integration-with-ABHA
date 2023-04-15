import { BsGithub, BsLinkedin, BsLink45Deg } from "react-icons/bs";
import NavBars from "./navbar";
import Footer from "./footer";

function Team() {
  return (
    <div>
      <NavBars />
      <section className="section-area section-sp3 team-wraper">
        <div className="container">
          <div className="heading-bx text-center">
            <h6 className="title-ext text-secondary">Our Team</h6>
            <h2 className="title">Meet the creators</h2>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Team;
