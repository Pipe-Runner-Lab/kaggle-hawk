import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export namespace FireBase {
  export function initializeApp() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      console.info("Firebase SDK initialized...");
    } else {
      console.log("Firebase app already exists");
    }
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
      return null;
    } catch (error) {
      console.error(error);
      return null;
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
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export async function getKaggleDifs() {
    try {
      const db = firebase.firestore();
      const collection = db.collection("kaggle");
      const docRef = collection.doc("diffs");

      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data().map;
      }
      console.error("[diffs] document not found on Kaggle collection");
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
