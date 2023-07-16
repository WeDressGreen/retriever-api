import { Express } from "express";
import SearchRouter from "../routes/search.route";

export default class RouterUtil {
    static init(app: Express): void {
        app.use('/search', SearchRouter);
    }
};