# ssh-tunnlr
Expose your Services via SSH to obtain a public IPv4

## Document Structure
db: tunnlr
collection: hosts

Host
{
    hostname: string,
    username: string,
    pem: string,
    active: boolean,
    comment: string,
    ports: Port[]
}

Port
{
    cloudPort: int,
    hostname: string,
    lokalPort: int,
    active: boolean,
    comment: string
}