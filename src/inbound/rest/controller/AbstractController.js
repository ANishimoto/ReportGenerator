export default class AbstractController {
    constructor() {
        this.health = this.health.bind(this);
    }

    async health (req, res, next) {
        res.send("I'm fine.");
    }
}