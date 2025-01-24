import { collection, getDocs } from "firebase/firestore";
import { db } from "../utilities/firebase"; // Ensure the path is correct

export const fetchFeatures = async () => {
  console.log("fetchFeatures called"); // Log to confirm the function is invoked
  try {
    const querySnapshot = await getDocs(collection(db, "websiteFeatures"));
    const features = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Features from Firestore:", features); // Log the fetched data
    return features;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw error;
  }
};
