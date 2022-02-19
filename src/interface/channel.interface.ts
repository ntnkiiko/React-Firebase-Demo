import { IComment } from "./comment.interface";

export interface IChannel {
	id: string;
	title: string;
	body: string;
	comments: IComment[];
}
