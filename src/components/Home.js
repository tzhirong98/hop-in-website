// Import necessary modules
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container>
        <h1 style={{ fontWeight: "bolder", color: "white" }}>
          Share the Ride, Share the Vibe!
        </h1>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Hop in, choose your spot, and let’s make every journey
          smoother — because the best rides are the ones we share!"
        </p>
      </Container>
    </div>
  );
};

export default Home;
