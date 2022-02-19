import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { auth, logout, signinWithGoogle } from "utils/firebase.api";

const HeaderComp = () => {
	const user = auth.currentUser;
	const path = useLocation();
	const router = useHistory();

	return (
		<Header>
			<div className="right">
				<button onClick={() => router.push("/")}>Home</button>
			</div>
			{!user ? (
				path.pathname !== "/login" ? (
					<button onClick={signinWithGoogle}>Log In</button>
				) : (
					""
				)
			) : (
				<div className="d-flex">
					<img referrerPolicy="no-referrer" src={user.photoURL!} alt="" />{" "}
					<button onClick={logout}>Log Out {user?.displayName}</button>
				</div>
			)}
		</Header>
	);
};

export default HeaderComp;
const Header = styled.header`
	/* background-color: #dde; */
	display: flex;
	justify-content: space-between;
	align-items: center;
	img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.d-flex {
		display: flex;
		justify-content: space-between;
	}
`;
