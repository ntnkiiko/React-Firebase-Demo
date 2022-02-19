import { ChannelAtom } from "atoms/channels.atom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { TOKEN_NAME } from "utils/constants";
import { auth, getChannels } from "utils/firebase.api";
import RouterComp from "./routes";

const App = () => {
	const setChannels = useSetRecoilState(ChannelAtom);

	const [loading, setLoading] = useState(true);

	const token = Cookies.get(TOKEN_NAME);

	const isAuth = Boolean(token);
	useEffect(() => {
		new Promise((resolve) => {
			resolve(
				auth.onAuthStateChanged((user) => {
					if (user) {
						Cookies.set(TOKEN_NAME, user.uid);
					} else {
						Cookies.remove(TOKEN_NAME);
					}
				}),
			);
		}).finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const loadChannels = async () => {
			try {
				const data = await getChannels();
				if (data) {
					setChannels(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		loadChannels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) return <p>loading...</p>;

	return <RouterComp isAuth={isAuth} />;
};

export default App;
