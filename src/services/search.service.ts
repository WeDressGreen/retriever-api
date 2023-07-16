import { IArticle } from "src/utils/interfaces/models/article.model";
import DatabaseUtil from "../utils/database.util";
import moment from "moment";

export default class SearchService {

    static async search(options: any): Promise<null | IArticle> {
        let data: null | IArticle = null;

		const searchedTerms: string[] = options["search"].split(" ");
		let params: {[k: string]: any} = {};

		searchedTerms.forEach((term, i) => params["search"+i] = `%${term}%`);
		let query = `SELECT * FROM articles WHERE ${searchedTerms.map((term, i) => `LOWER(content) LIKE LOWER("%${term}%")` ).join(" OR ")}`;

		if(options.from && options.to){
			query += `AND written_at BETWEEN :dateFrom AND :dateTo;`;
			params["dateFrom"] = moment(options.from, 'YYYY-MM-DD');
			params["dateTo"] = moment(options.to, 'YYYY-MM-DD');
		}

        const queryResult = await DatabaseUtil.query(query, params).catch((err) => console.log(err));

        if(!queryResult) return data;
        const res = queryResult[0];
        if(!res) return data;

        data = {
            id: res["id"],
			author: res["author"],
			authorEmail: res["author_email"],
			content: res["content"],
			writtenAt: moment(res["written_at"], 'YYYY-MM-DD')
        };

        return data;
    }

};