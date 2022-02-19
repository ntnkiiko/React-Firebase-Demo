import React, { useState } from "react";
import styled from "styled-components";
import { addComment, auth } from "utils/firebase.api";

interface IProp {
	channel: string;
}
const AddComment = ({ channel }: IProp) => {
	const user = auth.currentUser;
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		try {
			await addComment({
				channel,
				message,
				author: user.displayName!,
			});

			setMessage(" ");
		} catch (error) {
			console.log(error);
			setMessage(" ");
		} finally {
			setMessage(" ");
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<div>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					cols={30}
					rows={5}
				></textarea>
			</div>
			<button disabled={!user}>Submit</button>
		</Form>
	);
};

export default AddComment;
const Form = styled.form`
	margin-top: 1rem;

	button {
		padding: 0.7rem 1.7rem;
	}
`;
