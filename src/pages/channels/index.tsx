import { ChannelAtom } from "atoms/channels.atom";
import SingleChannelItem from "components/channels/SingleChannelItem";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ChannelListPage = () => {
	const channels = useRecoilValue(ChannelAtom);
	return (
		<Wrapper>
			<h2>All Channels Page</h2>

			{channels.map((channel, i) => (
				<SingleChannelItem key={i} channel={channel} />
			))}
		</Wrapper>
	);
};

export default ChannelListPage;
const Wrapper = styled.div``;
