import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SignupHelper from "../utilities/SignupHelper";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const SignUp = () => {
  const [isDriver, setIsDriver] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);

  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(20, "First Name must not exceed 20 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(20, "Last Name must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^(8|9)\d{7}$/,
        "Phone number must be 8 digits starting with 8 or 9"
      ),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address must not exceed 100 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Please select a role"),
    license: isDriver
      ? Yup.string()
          .required("Licence No. is required for drivers")
          .matches(
            /^[STFG]\d{7}[A-Z]$/,
            "Invalid Licence No. format (e.g., S1234567A)"
          )
      : Yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // function debounce(func, delay) {
  //   let timer;
  //   return function (...args) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func.apply(this, args), delay);
  //   };
  // }

  // const debouncedHandleAddressSelect = debounce((address) => {
  //   setSelectedAddress(address);
  //   handleAddressSelect(address);
  // }, 300);

  const onSubmit = async (data) => {
    if (!addressDetails) {
      alert("Please select a valid address.");
      return;
    }
    try {
      console.log("Form Data:", data);
      console.log("Address Details:", addressDetails);

      const user = await SignupHelper.registerUser(data);
      setVerificationModal(true);

      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          await SignupHelper.saveUserToFirestore(user, {
            ...data,
            addressDetails: addressDetails,
          });
          setVerificationModal(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    const endpoint = "/.netlify/functions/googlePlacesProxy"; // Use relative path for production


    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch place details: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || !data.result) {
        throw new Error("Invalid place details response");
      }

      return data;
    } catch (error) {
      console.error("Error fetching place details:", error);
      return null;
    }
  };

  const handleAddressSelect = async (address) => {
    if (address?.value?.place_id) {
      const placeDetails = await fetchPlaceDetails(address.value.place_id);

      if (!placeDetails || !placeDetails.result) {
        console.error("Invalid place details:", placeDetails);
        alert("Failed to fetch address details. Please try again.");
        return;
      }

      console.log("placeDetails", placeDetails);

      const formattedAddress = placeDetails.result.formatted_address;
      const lat = placeDetails.result.geometry.location.lat;
      const lng = placeDetails.result.geometry.location.lng;

      setAddressDetails({
        address: formattedAddress,
        lat,
        lng,
        placeId: address.value.place_id,
      });

      setValue("address", formattedAddress);
      clearErrors("address");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        {/* First Name */}
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            {...register("firstName")}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Last Name */}
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            {...register("lastName")}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            {...register("phone")}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Gender */}
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              inline
              label="Male"
              type="radio"
              value="Male"
              {...register("gender")}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              value="Female"
              {...register("gender")}
              isInvalid={!!errors.gender}
            />
            <Form.Control.Feedback type="invalid">
              {errors.gender?.message}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        {/* Address with Google Places Autocomplete */}
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_MAP_API_KEY}
            selectProps={{
              value: selectedAddress,
              onChange: handleAddressSelect,
              placeholder: "Search for an address",
              onFocus: () => {
                setSelectedAddress(null); 
                setAddressDetails(null); 
              },
            }}
            autocompletionRequest={{
              componentRestrictions: { country: "SG" }, 
            }}
          />
          {errors.address && (
            <div className="text-danger">{errors.address.message}</div>
          )}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Register As Driver/Rider */}
        <Form.Group className="mb-3">
          <Form.Label>Register as a</Form.Label>
          <Form.Select
            {...register("role")}
            isInvalid={!!errors.role}
            onChange={(e) => setIsDriver(e.target.value === "Driver")}
          >
            <option value="">Select role</option>
            <option value="Driver">Driver</option>
            <option value="Rider">Rider</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.role?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Licence No. - Show only for Drivers */}
        {isDriver && (
          <Form.Group className="mb-3">
            <Form.Label>Licence No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your licence number (e.g., S1234567A)"
              {...register("license")}
              isInvalid={!!errors.license}
            />
            <Form.Control.Feedback type="invalid">
              {errors.license?.message}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="submit"
            style={{ backgroundColor: "#3F441E" }}
          >
            Sign Up
          </Button>
          <Button
            variant="secondary"
            type="button"
            style={{ backgroundColor: "#3F441E" }}
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </Form>

      <Modal
        show={verificationModal}
        onHide={() => setVerificationModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Email Verification Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A verification email has been sent to your email address. <br />
            Please verify your email before proceeding. <br />
            This process may take a few moments. We will automatically detect
            once your email is verified.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setVerificationModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
