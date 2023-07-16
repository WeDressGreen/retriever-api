require("dotenv").config();
import mysql, { FieldInfo, MysqlError } from 'mysql';

export default class DatabaseUtil {
    static pool: mysql.Pool = mysql.createPool({
        connectionLimit : 100,
        debug: false,
        password: process.env.DB_PASSWORD,
        host: "127.0.0.1",
        user: "retriever",
        port: 3306,
        database: "wdg-retriever-data",
    });

    static async query(request: string, values: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.pool.query(request, values, (err: MysqlError | null, res: any, fields: FieldInfo[] | undefined) => {
                if(err) reject(err.message);
                else resolve(res);
            })
        });
    }
}