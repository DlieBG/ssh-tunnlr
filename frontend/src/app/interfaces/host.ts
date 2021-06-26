import { Port } from "./port";

export interface Host {
    _id: string,
    hostname: string,
    username: string,
    pem: string,
    active: boolean,
    lastChanged: Date,
    comment: string,
    ports: Port[]
}