import React from "react";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import Info from "./Info";
import validator from 'validator';

const Registration = () => {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [emailError, setEmailError] = useState('');
	const [error, setError] = useState('');

	// const [user, setUser] = useState({});

	// onAuthStateChanged(auth, (currentUser) => {
	// 	setUser(currentUser);
	// });

	const navigate = useNavigate();

	const navigateToinfo = () => {
		navigate('/info');
	};

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			console.log(user);

			navigateToinfo();
		} catch (error) {
			let errorMessage = error.code.split('/')[1];

			console.log(errorMessage);

			if (errorMessage === 'too-many-requests') {
				setError('Too many requests, try again later');
			} else if (errorMessage === 'email-already-in-use') {
				setError('User already exists');
			} else {
				setError('Ooops, something went wrong');
			}

			setTimeout(() => {
				setError(null);
			}, 1500);
		}
	};

	const validateEmail = (e) => {
		var email = e.target.value

		if (!validator.isEmail(email)) {
			setEmailError('Enter valid Email!')
		} else {
			setEmailError(null);
		}
	}

	return (
		<>
			<div>
				<div className="form">
					<h1 className="form__title"> Registration </h1>
					<input
						className="form__input"
						placeholder="Email..."
						onChange={(event) => {
							setRegisterEmail(event.target.value);
							validateEmail(event);
						}}
					/>
					{(emailError) ? <span className="error">{emailError}</span> : ''}
					<input
						className="form__input"
						placeholder="Password..."
						type="password"
						onChange={(event) => {
							setRegisterPassword(event.target.value);
						}}
					/>

					<button className="button" data-back="Click!)" data-front="Register" onClick={register}></button>

					{(error) ? <span className="error">{error}</span> : ''}

					<Routes>
						<Route path="/info" component={<Info />}></Route>
					</Routes>
				</div>
			</div>
		</>
	);
}

export default Registration;
