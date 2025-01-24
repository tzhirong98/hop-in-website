import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup } from "react-bootstrap";
import { fetchFeatures } from "../database/FeaturesDB"; 

const Feature = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFeatures = await fetchFeatures(); 
        console.log("Fetched Features:", fetchedFeatures); 
        setFeatures(fetchedFeatures);
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Features...</h2>;
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Features...</h2>;
  }

  return (
    <div style={styles.container}>
      {/* Heading */}
      <h1 style={styles.heading}>Features</h1>

      {/* Features Content */}
      <CardGroup style={styles.cardGroup}>
        {features.map((feature) => (
          <Card key={feature.id} style={styles.card}>
            <Card.Body>
              <Card.Title style={styles.cardTitle}>
                {feature.feature}
              </Card.Title>
              <Card.Text style={styles.cardText}>{feature.desc}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default Feature;

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "3rem 1rem",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  cardGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "2rem",
  },
  card: {
    width: "18rem",
    border: "1px solid #ddd",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    padding: "1rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  cardText: {
    fontSize: "1rem",
    color: "#555",
  },
};
