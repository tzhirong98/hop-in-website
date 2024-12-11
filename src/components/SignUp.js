import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  return (
    <Form style={{ width: "70vh" }}>
      <h2 style={{ marginBottom: "2rem" }}>Sign Up</h2>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          style={{ background: "lightgray", border: "0" }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          style={{ background: "lightgray", border: "0" }}
        />
      </Form.Group>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Group
          className="mb-3"
          controlId="PhoneNo"
          style={{ flexGrow: "1", marginRight: "1rem" }}
        >
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            style={{ background: "lightgray", border: "0" }}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="Gender"
          style={{ flexGrow: "1" }}
        >
          <Form.Label>Gender:</Form.Label>
          <Form.Select style={{ background: "lightgray", border: "0" }}>
            <option>Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Others</option>
          </Form.Select>
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="Address">
        <Form.Label>Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address"
          style={{ background: "lightgray", border: "0" }}
        />
      </Form.Group>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Group
          className="mb-3"
          controlId="Password"
          style={{ flexGrow: "1", marginRight: "1rem" }}
        >
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            style={{ background: "lightgray", border: "0" }}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="CfmPassword"
          style={{ flexGrow: "1" }}
        >
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            style={{ background: "lightgray", border: "0" }}
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="RegisterAs">
        <Form.Label>Register As:</Form.Label>
        <Form.Select style={{ background: "lightgray", border: "0" }}>
          <option>Select Role</option>
          <option value="1">Rider</option>
          <option value="2">Driver</option>
        </Form.Select>
      </Form.Group>

      {/* Button */}
      <Button
        type="submit"
        style={{
          margin: "10px",
          background: "#DFFA9F",
          color: "black",
          border: "0",
        }}
      >
        Clear
      </Button>
      <Button
        type="submit"
        style={{ margin: "10px", background: "#3F441E", border: "0" }}
      >
        Register Now
      </Button>
    </Form>
  );
};

export default SignUp;
