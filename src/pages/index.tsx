import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
	return (
		<Wrapper>
			<h1>Welcome to the firebase project demo</h1>

			<div>
				<h2>What would you like to do?</h2>

				<div>
					<Link to="/channels/new">Add A new Channel</Link>
				</div>
				<p>Or</p>

				<div>
					<Link to="/channels">View channels </Link>
				</div>
			</div>
		</Wrapper>
	);
};

export default HomePage;

const Wrapper = styled.div``;
