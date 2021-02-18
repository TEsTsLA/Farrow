import { DB } from "./DB";
import { Table } from "./Table";
import { Query } from "./Query";
import HideProtectedProperties = require("hide-protected-properties");

@HideProtectedProperties
export abstract class Adapter {
    connection: any = null;
    quote: string = "'";
    backquote: string | [string, string] = "`";

    abstract connect(db: DB): Promise<DB>;
    abstract query(db: DB, sql: string, bindings?: any[]): Promise<DB>;
    abstract release(): void;
    abstract close(): void;
    abstract getDDL(table: Table): string;

    static close(): void {
        throw new ReferenceError("Static method Adapter.close() is not implemented.");
    }

    transaction(db: DB, cb: (db: DB) => any): Promise<DB> {
        if (typeof cb == "function") {
            return db.query("begin").then(db => {
                let res = cb.call(db, db);
                if (res && res.then instanceof Function) { // Promise
                    return res.then(() => db) as Promise<DB>;
                } else {
                    return db;
                }
            }).then(db => {
                return this.commit(db);
            }).catch(err => {
                return this.rollback(db).then(() => {
                    throw err;
                });
            });
        } else {
            return db.query("begin");
        }
    }

    commit(db: DB): Promise<DB> {
        return db.query("commit");
    }

    rollback(db: DB): Promise<DB> {
        return db.query("rollback");
    }

    create(table: Table): Promise<Table> {
        return table.query(table.getDDL());
    }

    drop(table: Table): Promise<Table> {
        let sql = `drop table ${table.backquote(table.name)}`;
        return table.query(sql);
    }

    random(query: Query): Query {
        query["_orderBy"] = "random()";
        return query;
    }

    limit(query: Query, length: number, offset?: number): Query {
        let limit: number | [number, number] = offset ? [offset, length] : length;
        query["_limit"] = limit;
        return query;
    }

    getSelectSQL(query: Query): string {
        let isCount = (/count\(distinct\s\S+\)/i).test(query["_selects"]),
            distinct: string = query["_distinct"],
            selects: string = query["_selects"],
            join: string = query["_join"],
            where: string = query["_where"],
            orderBy: string = query["_orderBy"],
            groupBy: string = query["_groupBy"],
            having: string = query["_having"],
            union: string = query["_union"],
            limit: string;
        
        if(typeof query["_limit"] === "string")
            limit = <string>query["_limit"];
        else if (query["_limit"])
            limit = query["_limit"].toString();

        return "select " +
            (distinct && !isCount ? "distinct " : "") +
            selects + " from " +
            (!join ? query.backquote(query.table) : "") +
            join +
            (where ? " where " + where : "") +
            (groupBy ? " group by " + groupBy : "") +
            (having ? " having " + having : "") +
            (union ? " union " + union : "") +
            (orderBy ? " order by " + orderBy : "") +
            (limit ? " limit " + limit : "");
    }
}