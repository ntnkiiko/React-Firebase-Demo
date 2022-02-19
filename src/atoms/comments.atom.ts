import { IComment } from "interface/comment.interface";
import { atom } from "recoil";

export const CommentsAtom = atom({
	key: "CommentsAtom",
	default: [] as unknown as IComment[],
});
