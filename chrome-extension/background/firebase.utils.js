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

function initializeApp() {
  firebase.initializeApp(firebaseConfig);
  console.info("Firebase SDK initialized...");
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
    console.error("[kaggle] document not found on FireStore");
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const fireStore = {
  getKaggleCompetitions,
};

export const fireBase = {
  initializeApp,
};
