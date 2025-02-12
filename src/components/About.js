import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const fetchedTestimonials = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((testimonial) => testimonial.status === "published");

        const sortedTestimonials = fetchedTestimonials
          .sort((a, b) => b.datetime.toDate() - a.datetime.toDate())
          .slice(0, 3);
        setTestimonials(sortedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, rating));
    return [...Array(validRating)].map((_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} color="white" />
    ));
  };

  return (
    <div style={{ backgroundColor: "#c3c6a0", paddingBottom: "50px" }}>
      <Container style={{ padding: "50px" }}>
        {/* About Section */}
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          About Hop In
        </h2>
        <p style={{ textAlign: "center", fontSize: "18px", lineHeight: "1.8" }}>
          We are a passionate team committed to redefining how you travel by
          ridesharing smarter and more efficiently.
        </p>
        <p style={{ textAlign: "center", fontSize: "18px", lineHeight: "1.8" }}>
          Our unique approach empowers drivers to select 2-5 preferred pick-up
          and drop-off points, giving them more control over their routes.
          Riders, in turn, can choose a pick-up point based on the driver's
          preferences, ensuring it's never too far from their location. This
          balance creates a seamless experience for both drivers and riders,
          fostering a collaborative and sustainable way to move around.
        </p>
      </Container>

      {/* Testimonials Section */}
      <Container>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          Testimonials
        </h4>
        {loading ? (
          <h5 style={{ textAlign: "center" }}>Loading testimonials...</h5>
        ) : (
          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col xs={12} md={4} key={testimonial.id}>
                <Card
                  bg="dark"
                  border="warning"
                  text="white"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Card.Body>
                    <Card.Text
                      style={{ fontSize: "16px", fontStyle: "italic" }}
                    >
                      &quot;{testimonial.review}&quot;
                    </Card.Text>
                    <Card.Title
                      style={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                      – {testimonial.firstName} {testimonial.lastName}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small
                      className="text-muted"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      {renderStars(testimonial.rating)}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default About;
