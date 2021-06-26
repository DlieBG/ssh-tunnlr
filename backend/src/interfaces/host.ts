import { Port } from "./port";

export interface Host {
    _id: string,
    lastChanged: Date,
    hostname: string,
    port: number,
    username: string,
    identity: string,
    active: boolean,
    comment: string,
    ports: Port[]
}