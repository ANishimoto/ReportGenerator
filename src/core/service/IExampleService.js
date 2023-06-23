export default class IExampleService {
    constructor () {
        if (!this.save) throw new Error(`Method save not implemented in ${this.constructor.name}!`);
    }
}