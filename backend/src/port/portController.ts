import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import config from '../config';
import * as mongo from '../mongo';

export class PortController {

    public async getPort(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        let _id;

        try
        {
            _id = new ObjectId(req.params.portId);
        }
        catch(e)
        {
            res.sendStatus(400);
            return;
        }

        hosts.findOne(
            {
                "ports._id": _id
            },
            {
                projection:
                {
                    ports:
                    {
                        $elemMatch: { _id }
                    }
                }
            }
        ).then(data => {
            res.json(data.ports[0]);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async postPort(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        let _id;

        try
        {
            _id = new ObjectId(req.params.hostId);
        }
        catch(e)
        {
            res.sendStatus(400);
            return;
        }
        
        hosts.updateOne(
            {
                _id
            },
            {
                $set:
                {
                    lastChanged: new Date()
                },
                $push:
                {
                    ports:
                    {
                        _id: new ObjectId(),
                        remotePort: req.body.remotePort,
                        localHostname: req.body.localHostname,
                        localPort: req.body.localPort,
                        active: req.body.active,
                        name: req.body.name,
                        comment: req.body.comment
                    }
                }
            }
        ).then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async putPort(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        let _id;

        try
        {
            _id = new ObjectId(req.body._id);
        }
        catch(e)
        {
            res.sendStatus(400);
            return;
        }

        hosts.updateOne(
            {
                "ports._id": _id
            },
            {
                $set:
                {
                    lastChanged: new Date(),
                    "ports.$":
                    {
                        _id,
                        remotePort: req.body.remotePort,
                        localHostname: req.body.localHostname,
                        localPort: req.body.localPort,
                        active: req.body.active,
                        name: req.body.name,
                        comment: req.body.comment
                    }
                }
            }
        ).then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async deletePort(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        let _id;

        try
        {
            _id = new ObjectId(req.params.portId);
        }
        catch(e)
        {
            res.sendStatus(400);
            return;
        }
        
        hosts.updateOne(
            {
                "ports._id": _id
            },
            {
                $pull:
                {
                    ports:
                    {
                        _id: _id
                    }
                }
            }
        ).then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }
}