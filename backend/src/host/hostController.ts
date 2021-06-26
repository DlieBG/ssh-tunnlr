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
                pem: 0
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

        hosts.findOne(
            {
                _id: new ObjectId(req.params.hostId)
            },
            {
                
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