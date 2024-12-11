import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import RBook from "../img/RiderBook.jpg";
import RHP from "../img/RiderHP.jpg";
import RPromo from "../img/RiderPromo.jpg";

const Feature = () => {
  return (
    <CardGroup>
      <Card style={{ width: "18rem", border: "0" }}>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Features</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Card.Img
              variant="top"
              src={RBook}
              style={{ height: "60vh", width: "18rem" }}
            />
            <Card.Body style={{ width: "18rem" }}>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </div>

          <div>
            <Card.Img
              variant="top"
              src={RHP}
              style={{ height: "60vh", width: "18rem" }}
            />
            <Card.Body style={{ width: "18rem" }}>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </div>

          <div>
            <Card.Img
              variant="top"
              src={RPromo}
              style={{ height: "60vh", width: "18rem" }}
            />
            <Card.Body style={{ width: "18rem" }}>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </CardGroup>
  );
};

export default Feature;
