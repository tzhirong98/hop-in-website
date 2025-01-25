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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      return user; 
    } catch (error) {
      console.error("Error during user registration:", error.message);
      throw error; 
    }
  }

  static async saveUserToFirestore(user, data) {
    try {
      const usersCollection = collection(db, "users");
      const userDocRef = await addDoc(usersCollection, {
        uid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        role: data.role,
        license: data.role === "Driver" ? data.license : null,
        addressDetails: data.addressDetails,
        createdAt: new Date(),
        status: "verified"
      });

      const preferencesCollection = collection(
        db,
        `users/${userDocRef.id}/preferences`
      );
      await addDoc(preferencesCollection, {
        vehicleTypePref: "Economy",
        quietRidePref: true,
        driverPref: "Male",
        coRiderPref: 2,
        defaultPaymentPref: "Cash",
      });

      return userDocRef;
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      throw error; 
    }
  }
}

export default SignupHelper;
