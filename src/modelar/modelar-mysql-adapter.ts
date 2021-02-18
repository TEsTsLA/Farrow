import { createPool, Pool, PoolConnection } from "mysql";
import { Adapter } from './Adapter'
import { DB } from './DB'
import { Query } from './Query'
import { Table } from './Table'
import assign = require("lodash/assign");

var ModelarAdapter: typeof Adapter = Adapter;

export class MysqlAdapter extends ModelarAdapter {
    connection: PoolConnection;

    static Pools: { [dsn: string]: Pool } = {};

    connect(db: DB): Promise<DB> {
        var dsn = db.dsn,
            config = db.config;

        if (MysqlAdapter.Pools[dsn] === undefined) {
            let _config = <any>assign({}, config);
            _config.connectionLimit = config.max;
            MysqlAdapter.Pools[dsn] = createPool(_config);
        }

        return new Promise((resolve, reject) => {
            MysqlAdapter.Pools[dsn].getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection = connection;
                    resolve(db);
                }
            });
        });
    }

    query(db: DB, sql: string, bindings?: any[]): Promise<DB> {
        return new Promise((resolve, reject) => {
            let options: any = {
                sql: sql,
                values: bindings,
                timeout: db.config.timeout,
            };
            this.connection.query(options, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res instanceof Array) {
                        // Deal with select or pragma statements, they 
                        // returns an array.
                        let data = [];
                        for (let row of res) {
                            data.push(assign({}, row));
                        }
                        db.data = data;
                    } else {
                        // Deal with other statements like insert/update/
                        // delete.
                        db.insertId = res.insertId;
                        db.affectedRows = res.affectedRows;
                    }
                    resolve(db);
                }
            });
        });
    }

    release(): void {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    }

    close() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }
    }

    static close() {
        for (let i in MysqlAdapter.Pools) {
            MysqlAdapter.Pools[i].end();
            delete MysqlAdapter.Pools[i];
        }
    }

    /** Methods for Table */

    getDDL(table: Table) {
        let numbers = ["int", "integer"];
        let columns: string[] = [];
        let foreigns: string[] = [];
        let primary: string;
        let autoIncrement: string;

        for (let key in table.schema) {
            let field = table.schema[key];
            if (field.primary && field.autoIncrement) {
                if (numbers.indexOf(field.type.toLowerCase()) === -1) {
                    field.type = "int";
                    if (!field.length)
                        field.length = 10;
                }

                autoIncrement = " auto_increment=" + field.autoIncrement[0];
            }

            let type = field.type;
            if (field.length instanceof Array) {
                type += "(" + field.length.join(",") + ")";
            } else if (field.length) {
                type += "(" + field.length + ")";
            }

            let column = table.backquote(field.name) + " " + type;

            if (field.primary)
                primary = field.name;

            if (field.autoIncrement)
                column += " auto_increment";

            if (field.unique)
                column += " unique";

            if (field.unsigned)
                column += " unsigned";

            if (field.notNull)
                column += " not null";

            if (field.default === null)
                column += " default null";
            else if (field.default !== undefined)
                column += " default " + table.quote(field.default);

            if (field.comment)
                column += " comment " + table.quote(field.comment);

            if (field.foreignKey && field.foreignKey.table) {
                let foreign = "constraint " + table.backquote(field.name)
                    + ` foreign key (${table.backquote(field.name)})`
                    + " references " + table.backquote(field.foreignKey.table)
                    + " (" + table.backquote(field.foreignKey.field) + ")"
                    + " on delete " + field.foreignKey.onDelete
                    + " on update " + field.foreignKey.onUpdate;

                foreigns.push(foreign);
            };

            columns.push(column);
        }

        let sql = "create table " + table.backquote(table.name) +
            " (\n\t" + columns.join(",\n\t");

        if (primary)
            sql += ",\n\tprimary key (" + table.backquote(primary) + ")";

        if (foreigns.length)
            sql += ",\n\t" + foreigns.join(",\n\t");

        sql += "\n)";

        if (table.config.type === "maria")
            sql += " engine=Aria transactional=1";
        else
            sql += " engine=InnoDB";

        sql += ` default charset=${table.config.charset}`;

        return autoIncrement ? sql + autoIncrement : sql;
    }

    random(query: Query): Query {
        query["_orderBy"] = "rand()";
        return query;
    }
}