import React from "react";
import { useState } from "react";
import {
	onAuthStateChanged,
	signOut
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "../pages/Homepage";

const Profile = () => {
	const navigate = useNavigate();

	const navigateToinfo = () => {
		navigate('/');
	};

	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const logout = async () => {
		await signOut(auth);

		navigateToinfo();
	};

	return (
		<>
			<div className="profile">
				<h2 className="profile__title">Profile</h2>
				<p className="profile__email"><span className="profile__email_bold">Email:</span> {user?.email}</p>
				<button className="button" data-back="Click!)" data-front="Sign Out" onClick={logout}></button>
				<Routes>
					<Route path="/homepage" component={<Homepage />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default Profile;
