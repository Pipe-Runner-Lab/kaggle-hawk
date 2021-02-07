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

export namespace FireBase {
  export function initializeApp() {
    firebase.initializeApp(firebaseConfig);
    console.info("Firebase SDK initialized...");
  }
}

export namespace FireStore {
  export async function getKaggleCompetitions() {
    try {
      const db = firebase.firestore();

      const collection = db.collection("kaggle");
      const docRef = collection.doc("contests");

      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data().map;
      }
      console.error("[contests] document not found in Kaggle collection");
      return {};
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  export async function getKaggleLeaderboards() {
    try {
      const db = firebase.firestore();

      const collection = db.collection("kaggle");
      const docRef = collection.doc("leaderboards");

      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data().map;
      }
      console.error("[leaderboard] document not found on Kaggle collection");
      return {};
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}