export interface Port {
    _id: string,
    remotePort: number,
    localHostname: string,
    localPort: string,
    active: boolean,
    name: string,
    comment: string
}