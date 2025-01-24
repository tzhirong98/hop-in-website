import { collection, getDocs } from "firebase/firestore";
import { db } from "../utilities/firebase";

export const fetchFeatures = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "websiteFeatures"));
    const features = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Features from Firestore:", features); 
    return features;
  } catch (error) {
    console.error("Error fetching features:", error);
    throw error;
  }
};
