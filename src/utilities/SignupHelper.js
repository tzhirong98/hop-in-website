// SignupHelper.js
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../utilities/firebase";

class SignupHelper {
  static async registerUser(data) {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      return user; // Return the user object for further use
    } catch (error) {
      console.error("Error during user registration:", error.message);
      throw error; // Rethrow the error for the calling component to handle
    }
  }

  static async saveUserToFirestore(user, data) {
    try {
      // Add user details to Firestore
      const usersCollection = collection(db, "users");
      const userDocRef = await addDoc(usersCollection, {
        uid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        address: data.address,
        role: data.role,
        license: data.role === "Driver" ? data.license : "",
        createdAt: new Date(),
      });

      // Add preferences to a subcollection if needed
      const preferencesCollection = collection(
        db,
        `users/${userDocRef.id}/preferences`
      );
      await addDoc(preferencesCollection, {
        vehicleTypePref: "Economy",
        quietRidePref: true,
        driverPref: "Male",
        waitTimePref: 3,
        coRiderPref: 2,
        defaultPaymentPref: "Cash",
      });

      return userDocRef; // Return the user document reference
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      throw error; // Rethrow the error for the calling component to handle
    }
  }
}

export default SignupHelper;
