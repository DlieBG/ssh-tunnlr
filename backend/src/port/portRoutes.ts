import { Router } from 'express';
import { PortController } from './portController';

export class PortRoutes {

    public router: Router;
    public controller: PortController = new PortController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes():void {
        this.router.get("/:portId", this.controller.getPort);

        this.router.post("/:hostId", this.controller.postPort);

        this.router.put("/", this.controller.putPort);

        this.router.delete("/:portId", this.controller.deletePort);
    }
}
