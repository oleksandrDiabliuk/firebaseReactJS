import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAkYilpKecHymL4Js0wBT_5IsbIERYPXkA",
	authDomain: "lab-auth-460d3.firebaseapp.com",
	projectId: "lab-auth-460d3",
	storageBucket: "lab-auth-460d3.appspot.com",
	messagingSenderId: "208155780675",
	appId: "1:208155780675:web:a7cc2210ae7365b01016f6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {
	db,
	auth
}
