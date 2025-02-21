import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utilities/firebase";

class SignupHelper {
  static async checkIfNumberExists(mobileNumber, licenseNumber, userRole) {
    // Ensure the mobileNumber and licenseNumber are valid before querying
    if (!mobileNumber && !licenseNumber) {
      throw new Error("Both mobile number and license number cannot be empty.");
    }

    let mobileExists = false;
    let licenseExists = false;

    // Check if mobile number exists in the "users" collection (if mobileNumber is provided)
    if (mobileNumber) {
      const mobileQuery = query(
        collection(db, "users"),
        where("phone", "==", mobileNumber)
      );
      const mobileQuerySnapshot = await getDocs(mobileQuery);
      mobileExists = !mobileQuerySnapshot.empty;
    }

    // Check if license number exists in the "users" collection (if licenseNumber is provided)
    if (licenseNumber) {
      const licenseQuery = query(
        collection(db, "users"),
        where("license", "==", licenseNumber)
      );
      const licenseQuerySnapshot = await getDocs(licenseQuery);
      licenseExists = !licenseQuerySnapshot.empty;
    }

    return mobileExists || licenseExists;
  }

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
        driverStatus: data.role === "Driver" ? "Pending" : null,
        driverRating: data.role === "Driver" ? 5 : 0,
        noOfRating: data.role === "Driver" ? 1 : 1,
        riderStatus: "Verfied",
        banned: false,
        banReason: null,
      });

      const preferencesCollection = collection(
        db,
        `users/${userDocRef.id}/preferences`
      );
      await addDoc(preferencesCollection, {
        vehicleTypePref: "SUV",
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
