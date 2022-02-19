import { IComment } from "interface/comment.interface";
import React from "react";
import styled from "styled-components";

const CommentComp = ({ comment }: { comment: IComment }) => {
	return (
		<Wrapper>
			<div>{comment?.message}</div>
			<small>{comment?.author}</small>
		</Wrapper>
	);
};

export default CommentComp;

const Wrapper = styled.div``;
