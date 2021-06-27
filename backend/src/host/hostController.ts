import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import config from '../config';
import * as mongo from '../mongo';

export class HostController {

    public async getHosts(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        hosts.find(
            {

            }
        ).project(
            {
                identity: 0
            }
        ).sort(
            {
                _id: -1
            }
        )
        .toArray()
        .then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async getHost(req: Request, res: Response): Promise<void> {
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

        hosts.findOne(
            {
                _id
            }
        ).then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async postHost(req: Request, res: Response): Promise<void> {
        const client = await mongo.getConnection().connect();
        const db = client.db('tunnlr');
        const hosts = db.collection('hosts');

        hosts.insertOne(
            {
                lastChanged: new Date(),
                hostname: req.body.hostname,
                port: req.body.port,
                username: req.body.username,
                identity: req.body.identity,
                active: req.body.active,
                name: req.body.name,
                comment: req.body.comment,
                ports: []
            }
        ).then(data => {
            res.json(data);
        }).catch(error => {
            res.sendStatus(500);
        }).finally(() => {
            client.close();
        });
    }

    public async putHost(req: Request, res: Response): Promise<void> {
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
                _id
            },
            {
                $set:
                {
                    lastChanged: new Date(),
                    hostname: req.body.hostname,
                    port: req.body.port,
                    username: req.body.username,
                    identity: req.body.identity,
                    active: req.body.active,
                    name: req.body.name,
                    comment: req.body.comment
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

    public async deleteHost(req: Request, res: Response): Promise<void> {
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
        
        hosts.deleteOne(
            {
                _id
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