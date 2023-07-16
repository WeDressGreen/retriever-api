import { Moment } from "moment";

export interface IArticle {
    id: string;
    author: string;
	authorEmail: string;
	content: string;
	writtenAt: Moment;
}