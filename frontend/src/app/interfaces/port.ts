export interface Port {
    _id: string,
    remotePort: number,
    localHostname: string,
    localPort: number,
    active: boolean,
    name: string,
    comment: string
}