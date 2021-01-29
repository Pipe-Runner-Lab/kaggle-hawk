import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7ePDPteLqajMV6bTBP9_QOqw7EogJY_A",
  authDomain: "kaggle-hawk.firebaseapp.com",
  projectId: "kaggle-hawk",
  storageBucket: "kaggle-hawk.appspot.com",
  messagingSenderId: "42783792066",
  appId: "1:42783792066:web:17ac6dc0da5b6e6ec2145b",
  measurementId: "G-TGVP9S4GMN",
};

export function initializeApp() {
  firebase.initializeApp(firebaseConfig);
}

async function getKaggleCompetitions() {
  try {
    const db = firebase.firestore();

    const collection = db.collection("contest_sites");
    const docRef = collection.doc("kaggle");

    const doc = await docRef.get();
    if (doc.exists) {
      return doc.data();
    }

    return new Error("'kaggle' - Document not found on firestore");
  } catch (error) {
    console.error(error);
  }
}

export const fireStoreQuery = {
  getKaggleCompetitions,
};
