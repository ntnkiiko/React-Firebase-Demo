import HeaderComp from "components/HeaderComp";
import React from "react";
import styled from "styled-components";

const Frontlayout = ({ children }: { children: React.ReactChild }) => {
	return (
		<Wrapper>
			<div className="container">
				<HeaderComp />
				<main className="main">{children}</main>
			</div>
		</Wrapper>
	);
};

export default Frontlayout;

const Wrapper = styled.div`
	.container {
		width: 100%;
		max-width: 80%;
		padding: 1rem;
		margin: auto;
	}
	.main {
		margin-top: 1rem;
	}
`;
