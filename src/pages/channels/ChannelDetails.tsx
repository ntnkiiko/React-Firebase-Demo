import { collection, onSnapshot } from "@firebase/firestore";
import { ChannelAtom } from "atoms/channels.atom";
import AddComment from "components/channels/AddComment";
import CommentComp from "components/channels/CommentComp";
import { IChannel } from "interface/channel.interface";
import { IComment } from "interface/comment.interface";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getChannel } from "utils/firebase.api";
import { db } from "utils/firebase.config";

const ChannelDetails = () => {
	const { id } = useParams<{ id: string }>();
	const channels = useRecoilValue(ChannelAtom);
	const [comments, setComments] = useState<IComment[]>();
	const [channel, setChannel] = useState<Partial<IChannel>>();
	const router = useHistory();

	useEffect(() => {
		const loadChannel = async () => {
			const data = await getChannel(id);
			setChannel(data);
		};
		loadChannel();
	}, [id, channels, comments]);

	useEffect(() => {
		const q = collection(db, "channels", id, "comments");
		onSnapshot(q, (querySnapshot) => {
			const comments: any[] = [];
			querySnapshot.forEach((doc) => {
				comments.push(doc.data());
			});
			setComments(comments as any);
		});
	}, [comments, id]);

	return (
		<Wrapper>
			<button onClick={() => router.goBack()}>Back</button>
			<h1>{channel?.title}</h1>
			<div>{channel?.body}</div>

			<AddComment channel={id as any} />

			<div className="comments">
				{comments?.map((comment, i) => (
					<div className="comment" key={i}>
						<CommentComp comment={comment} />
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default ChannelDetails;

const Wrapper = styled.div`
	.comments {
		margin-top: 1rem;
		.comment {
			margin-bottom: 0.5rem;
		}
	}
`;
