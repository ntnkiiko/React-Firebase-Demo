import { IChannel } from "interface/channel.interface";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SingleChannelItem = ({ channel }: { channel: IChannel }) => {
	return (
		<Wrapper>
			<div className="inner">
				<Link to={`/channels/${channel?.id}`}>{channel.title}</Link>
			</div>
		</Wrapper>
	);
};

export default SingleChannelItem;

const Wrapper = styled.div``;
