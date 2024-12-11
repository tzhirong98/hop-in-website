// Import necessary modules
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
/* import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import manImg from "./img/man.png";
import womanImg from "./img/woman.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons"; */

// Img
import banner from "./img/ridesharing.jpg"; // Your image path

// Components
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";

// Firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFD0TRcUo4urNBH2TWp0X7AgTjUonTc14",
  authDomain: "hop-in-website-46ba1.firebaseapp.com",
  projectId: "hop-in-website-46ba1",
  storageBucket: "hop-in-website-46ba1.firebasestorage.app",
  messagingSenderId: "595189280348",
  appId: "1:595189280348:web:347def1587229e51acc099",
  measurementId: "G-21VH3N172E",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#3F441E" }}
        variant="dark"
        expand="lg"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">HopIn!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="home" style={{ height: "100vh", paddingTop: "80px" }}>
        <Container >
          <Home />
        </Container>
      </section>

      {/* About Section */}
      <section
        id="aboutus"
        style={{ height: "100vh", padding: "7vh", backgroundColor: "#74785C" }}
      >
        <Container>
          <About />
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" style={{ height: "100vh", padding: "7vh" }}>
        <Container>
          <h2>Features</h2>
          <p>
            Discover our unique carpooling features that help you find the best
            rides.
          </p>
        </Container>
      </section>

      {/* Sign Up Section */}
      <section
        id="signup"
        style={{ height: "100vh", background: "#74785C", padding: "7vh" }}
      >
        <SignUp />
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
