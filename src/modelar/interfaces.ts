import { Model } from "./Model";

export interface DBConfig {
    [x: string]: any
    type?: string;
    database: string;
    /** socket, TCP, TCPIP (default), pipe, UNIX (UNIX socket), memory, etc. */
    protocol?: string;
    host?: string;
    port?: number;
    /** The path to a UNIX domain socket (if supported), when `host` and `port` are missing. */
    socketPath?: string;
    user?: string;
    password?: string;
    ssl?: string | {
        [x: string]: any;
        rejectUnauthorized?: boolean,
        ca?: string,
        key?: string,
        cert?: string
    };
    timeout?: number;
    charset?: string;
    /** Maximum connection count of the pool. */
    max?: number;
    /**
     * Customize connection string when necessary, be aware different adapters
     * support different string formats.
     */
    connectionString?: string;
}

export const DBConfig: DBConfig = {
    type: "mysql",
    database: "",
    protocol: "TCPIP",
    host: "",
    port: 0,
    user: "",
    password: "",
    ssl: null,
    timeout: 5000,
    charset: "utf8",
    max: 50,
    connectionString: "",
};

export interface ForeignKeyConfig {
    /** The name of the foreign table. */
    table: string,
    /** The binding field in the foreign table. */
    field: string,
    /** An action will be triggered when the record is deleted. */
    onDelete?: "no action" | "set null" | "cascade" | "restrict",
    /** An action will be triggered when the record is update. */
    onUpdate?: "no action" | "set null" | "cascade" | "restrict"
}

export const ForeignKeyConfig: ForeignKeyConfig = {
    table: "",
    field: "",
    onDelete: "set null",
    onUpdate: "no action"
};

export interface FieldConfig {
    name: string;
    type?: string;
    length?: number | [number, number];
    primary?: boolean;
    autoIncrement?: false | [number, number];
    unique?: boolean;
    default?: any;
    unsigned?: boolean;
    comment?: string;
    notNull?: boolean;
    foreignKey?: ForeignKeyConfig;
}

export const FieldConfig: FieldConfig = {
    name: "",
    type: "",
    length: 0,
    notNull: false,
    default: undefined,
    primary: false,
    autoIncrement: false,
    unsigned: false,
    unique: false,
    comment: "",
    foreignKey: null,
}

export interface ModelConfig {
    /** The table that the model binds to. */
    table: string;
    /** Primary key of the model's table. */
    primary: string;
    /** Fields in the model's table. */
    fields: string[];
    /** Searchable fields in the model's table. */
    searchable?: string[];
}

export const ModelConfig: ModelConfig = {
    table: "",
    primary: "",
    fields: null,
    searchable: null
};

export interface PaginatedArray<T> extends Array<T> {
    readonly page: number;
    /** A number of all record pages. */
    readonly pages: number;
    /** The top limit of per page. */
    readonly limit: number;
    /** A number of all record counts. */
    readonly total: number;
}

export interface PaginatedRecords<T = any> extends PaginatedArray<T> {
    readonly data: T[]
}

export interface PaginatedModels<T extends Model> extends PaginatedRecords<T> {
    readonly orderBy?: string,
    readonly sequence?: "asc" | "desc" | "rand",
    /** Used for vague searching. */
    readonly keywords?: string | string[]
}

export interface ModelGetManyOptions {
    /** Default `1`. */
    page?: number,
    /** Default `10` */
    limit?: number,
    /** Default `model.primary` */
    orderBy?: string,
    /** Default `asc`. */
    sequence?: "asc" | "desc" | "rand",
    /** Used for vague searching. */
    keywords?: string | string[],
    [field: string]: any
}

export const ModelGetManyOptions: ModelGetManyOptions = {
    page: 1,
    limit: 10,
    orderBy: "id",
    sequence: "asc",
    keywords: ""
};