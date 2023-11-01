export default class AbstractController {
    constructor() {
        this.health = this.health.bind(this);
    }

    async health (req, res) {
        res.send("I'm fine.");
        res.end();
    }
}