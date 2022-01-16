// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzunTz156mUeggaxygIi0Q2KpmFqsDFOU",
  authDomain: "mainichi-habits.firebaseapp.com",
  projectId: "mainichi-habits",
  storageBucket: "mainichi-habits.appspot.com",
  messagingSenderId: "856649763601",
  appId: "1:856649763601:web:65e46044483a7f7d329ab0",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

export const createUser = async (username: string) => {
  try {
    const user = await addDoc(collection(firestore, "users"), {
      username,
    });
    await AsyncStorage.setItem("userId", user.id);
    console.log("user added", user);
  } catch (err: any) {
    Alert.alert(err.message);
  }
};
