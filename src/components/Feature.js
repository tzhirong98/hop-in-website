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
              <Card.Title>Rider Trip Booking</Card.Title>
              <Card.Text>
                Riders can search, view, and book available trips with real-time
                updates and trip details.
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
              <Card.Title>Rider Homepage</Card.Title>
              <Card.Text>
                A central hub displaying upcoming trips, promotions, trip
                history, and quick ride search.
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
              <Card.Title>Promotions and Special Offers</Card.Title>
              <Card.Text>
                Riders can access and apply promo codes for discounts and stay
                informed about special deals.
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </CardGroup>
  );
};

export default Feature;
