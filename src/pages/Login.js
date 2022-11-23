import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, useNavigate } from "react-router-dom";
import Info from "./Info";
import validator from 'validator';

const Login = () => {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [emailError, setEmailError] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const navigateToinfo = () => {
		navigate('/info');
	  };

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			);
			console.log(user);
			
			setLoginEmail('');
			setLoginPassword('');

			navigateToinfo();
		} catch (error) {
			let errorMessage = error.code.split('/')[1];

			console.log(errorMessage);

			if (errorMessage === 'too-many-requests') {
				setError('Too many requests, try again later');
			} else if (errorMessage === 'invalid-email') {
				setError('Incorrect Email');
			} else if (errorMessage === 'wrong-password') {
				setError('Wrong password. Try again');
			} else if (errorMessage === 'user-not-found') {
				setError('User not found!');
			} else {
				setError('Ooops, something went wrong');
			}

			setTimeout(() => {
				setError(null);
			}, 1500);
		}
		
	};

	const validateEmail = (e) => {
		var email = e.target.value;

		if (!validator.isEmail(email)) {
			setEmailError('Enter valid Email!');
			
			return false;
		} else {
			setEmailError(null);
			
			return true;
		}
	}

	return (
		<>
			<div className="form">
				<h1 className="form__title"> Login </h1>
				<input
					className="form__input"
					placeholder="Email..."
					onChange={(event) => {
						setLoginEmail(event.target.value);
						validateEmail(event);
					}}
				/>
				{(emailError) ? <span className="error">{emailError}</span> : ''}
				<input
					className="form__input"
					placeholder="Password..."
					type="password"
					required
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>

				<button className="button" data-back="Click!)" data-front="Login" onClick={login}></button>
				
				{(error) ? <span className="error">{error}</span> : ''}
			
				<Routes>
					<Route path="/info" component={<Info />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default Login;
