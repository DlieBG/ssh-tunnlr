# ssh-tunnlr
Expose your Services via SSH to obtain a public IPv4

## Document Structure
db: tunnlr
collection: hosts

Host
{
    _id: ObjectId,
    hostname: string,
    port: int,
    username: string,
    pem: string,
    active: boolean,
    lastChanged: Date,
    comment: string,
    ports: Port[]
}

Port
{
    _id: ObjectId,
    cloudPort: int,
    hostname: string,
    localPort: int,
    active: boolean,
    comment: string
}