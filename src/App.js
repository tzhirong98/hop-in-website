import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import banner from "./img/ridesharing.jpg";

// Components
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Feature from "./components/Feature";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  // Extract token from URL and validate
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const adminToken = queryParams.get("adminToken");

    console.log("Admin Token from URL:", adminToken); // Log token for debugging

    if (adminToken) {
      // Validate the token with the backend
      fetch("https://hopinrideshare.netlify.app/verify-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: adminToken }),
      })
        .then((response) => {
          console.log("Raw Response:", response); // Log raw response
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response from Backend:", data); // Log parsed response
          if (data.isValid) {
            setIsAdmin(true); // Enable admin tools
          } else {
            console.error("Invalid admin token.");
          }
        })
        .catch((error) => console.error("Error verifying token:", error));
    } else {
      console.error("No admin token found in the URL.");
    }
  }, []);

  // Debug log for admin state
  useEffect(() => {
    console.log("Is Admin State Updated:", isAdmin);
  }, [isAdmin]);

  return (
    <div>
      {/* Navbar */}
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

      {/* Admin Tools */}
      {isAdmin && (
        <div style={{ padding: "10px", backgroundColor: "#FFF3CD" }}>
          <h3>Admin Tools</h3>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => alert("Edit Home Section")}
          >
            Edit Home Section
          </button>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => alert("Edit About Section")}
          >
            Edit About Section
          </button>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => alert("Edit Features Section")}
          >
            Edit Features Section
          </button>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => alert("Edit Sign-Up Section")}
          >
            Edit Sign-Up Section
          </button>
        </div>
      )}

      {/* Sections */}
      <section
        id="home"
        style={{
          height: "auto",
          padding: "0",
          margin: "0",
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Home />
      </section>

      {/* About Section */}
      <section
        id="aboutus"
        style={{ height: "auto", padding: "7vh", backgroundColor: "#74785C" }}
      >
        <About />
      </section>

      {/* Features Section */}
      <section id="features" style={{ height: "auto", padding: "7vh" }}>
        <Feature />
      </section>

      {/* Sign Up Section */}
      <section
        id="signup"
        style={{
          height: "auto",
          background: "#74785C",
          padding: "7vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SignUp />
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
