import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IChannel } from "interface/channel.interface";
import { IComment } from "interface/comment.interface";
import { IUser } from "interface/user.interface";
import Cookies from "js-cookie";
import { db } from "utils/firebase.config";
import { TOKEN_NAME } from "./constants";

const channels = collection(db, "channels");
const comments = collection(db, "comments");
const users = collection(db, "users");
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const getChannels = async (): Promise<IChannel[] | null> => {
	try {
		const { docs } = await getDocs(channels);
		const data = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

		return data as IChannel[];
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const getChannel = async (id: string) => {
	const docRef = doc(db, "channels", id);
	const res = await getDoc(docRef);
	const data = { ...res.data(), id: res.id };

	return data;
};

export const addChannel = async (
	payload: Partial<IChannel>,
): Promise<Partial<IChannel> | null> => {
	try {
		const { id } = await addDoc(channels, payload);

		return { ...payload, id };
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const addComment = async (payload: Partial<IComment>) => {
	const { id } = await addDoc(
		collection(db, "channels", payload.channel!, "comments"),
		payload,
	);

	return { ...payload, id };
};

export const getComments = async () => {
	const { docs } = await getDocs(comments);
	const data = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return data as IComment[];
};

export const signinWithGoogle = async () => {
	try {
		const { user } = await signInWithPopup(auth, provider);
		const users = await getUsers();
		const foundUser = users.find((u) => u.uid === user.uid);
		if (!foundUser) {
			await createUser({
				id: user.uid,
				uid: user.uid,
				displayName: user.displayName as string,
				photoURL: user.photoURL as string,
			});
		}
		Cookies.set(TOKEN_NAME, user.uid);
		window.location.href = "/channels";
		return user;
	} catch (error) {
		console.log(error);
	}
};

export const logout = async () => {
	try {
		await auth.signOut();
		Cookies.remove(TOKEN_NAME);
		deleteAllCookies();
		window.location.href = "/login";
	} catch (error: any) {
		console.log(error.message);
	}
};

export const createUser = async (payload: Partial<IUser>) => {
	const { id } = await addDoc(users, payload);

	return { ...payload, id };
};

export const getUsers = async () => {
	const { docs } = await getDocs(users);
	const data = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return data as IUser[];
};

function deleteAllCookies() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}
