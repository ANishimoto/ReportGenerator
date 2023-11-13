export default class IPuppeteerService {
    constructor () {
        if (!this.createFile) throw new Error(`Method createFile not implemented in ${this.constructor.name}!`);
    }
}