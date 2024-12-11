// Import necessary modules
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div>
      <Container>
        <h2
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "40px" }}
        >
          About Hop In
        </h2>
        <p style={{ textAlign: "center" }}>
          We are a passionate team commited to redefining how you travel by
          ridesharing smarter and more efficient.
        </p>
        <p style={{ textAlign: "center" }}>
          Our unique approach empowers drivers to select 2-5 preferred pick-up
          and drop-off points, giving them more control over their routes.
          <br></br>
          Riders, in turn, can choosoe a pick-up point based on the driver's
          preferences, ensuring it's never too far from their location.{" "}
          <br></br>
          This balances creates a seamless experience for both drivers and
          riders, fosterign a collaborative and sustainable way to move around.
        </p>
      </Container>

      <Container>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Text>
                "This app has made my daily commute so much easier! The pickup
                points are super convenient, and I love how flexible it is for
                both drivers and riders."
              </Card.Text>
              <Card.Title>– Sarah T.</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Rating:</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Text>
                "As a driver, I appreciate being able to choose my routes. It
                saves me time and makes the whole experience stress-free."
              </Card.Text>

              <Card.Title>- John L.</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Rating: </small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Text>
                "Finally, a ridesharing app that works for everyone! It’s
                efficient, easy to use, and the shared rides feel so organized."
              </Card.Text>

              <Card.Title>- Alisa T.</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container>
    </div>
  );
};

export default About;
