import React from "react";
import { signinWithGoogle } from "utils/firebase.api";

const LoginPage = () => {
	return (
		<div>
			<h1>Login to continue</h1>
			<button onClick={signinWithGoogle}>Login</button>
		</div>
	);
};

export default LoginPage;
