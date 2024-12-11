// Import necessary modules
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <h1 style={{ textAlign: "center", fontWeight: "bolder", color: "black" }}>
        Share the Ride, Share the Vibe!
      </h1>
      <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
        Hop in, choose your spot, and let’s make every journey smoother—because
        the best rides are the ones we share!"
      </p>
    </Container>
  );
};

export default Home;
