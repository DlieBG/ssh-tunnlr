import { Router } from 'express';
import { HostController } from './hostController';

export class HostRoutes {

    public router: Router;
    public controller: HostController = new HostController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes():void {
        this.router.get("/", this.controller.getHosts);
        this.router.get("/:hostId", this.controller.getHost);

        this.router.post("/", this.controller.postHost);

        this.router.put("/", this.controller.putHost);

        this.router.delete("/:hostId", this.controller.deleteHost);
    }
}
