import { Port } from "./port";

export interface Host {
    _id: string,
    lastChanged: Date,
    hostname: string,
    port: number,
    username: string,
    identity: string,
    active: boolean,
    name: string,
    comment: string,
    ports: Port[]
}