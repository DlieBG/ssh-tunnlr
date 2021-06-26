export interface Port {
    _id: string,
    remotePort: number,
    localHostname: string,
    localPort: string,
    active: boolean,
    comment: string
}