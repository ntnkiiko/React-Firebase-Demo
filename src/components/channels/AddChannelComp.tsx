import { ChannelAtom } from "atoms/channels.atom";
import { IChannel } from "interface/channel.interface";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addChannel, auth } from "utils/firebase.api";

interface IProp {
	title: string;
	body: string;
}

const AddChannelComp = () => {
	const [info, setInfo] = useState<IProp>({ title: "", body: "" });
	const setChannels = useSetRecoilState(ChannelAtom);
	const router = useHistory();
	const user = auth.currentUser;

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { value, name } = e.target;
			setInfo({
				...info,
				[name]: value,
			});
		},
		[info],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const data = await addChannel({
				...info,
				author: user?.uid,
			} as Partial<IChannel>);
			setChannels((old) => [data, ...old] as IChannel[]);
			alert("You created a new Channel Successfully !");
			router.push("/channels");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						required
						placeholder="Subject"
						value={info.title}
						name="title"
						onChange={handleChange}
					/>
				</div>
				<div>
					<textarea
						value={info.body}
						onChange={handleChange}
						name="body"
						required
						cols={30}
						rows={10}
					></textarea>
				</div>
				<button>Add Channel</button>
			</form>
		</Wrapper>
	);
};

export default AddChannelComp;

const Wrapper = styled.div`
	form {
		input,
		textarea {
			margin-bottom: 1rem;
			width: 100%;
			padding: 1rem;
			box-sizing: border-box;
		}
		button {
			padding: 1rem;
		}
	}
`;
