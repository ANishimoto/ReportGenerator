export default class IRepository {
    constructor (connection) {
        this.connection = connection;
        if (!this.save) throw new Error(`Method save not implemented in ${this.constructor.name}!`);
        if (!this.update) throw new Error(`Method update not implemented in ${this.constructor.name}!`);
        if (!this.delete) throw new Error(`Method delete not implemented in ${this.constructor.name}!`);
        if (!this.findAll) throw new Error(`Method findAll not implemented in ${this.constructor.name}!`);
        if (!this.findOne) throw new Error(`Method finOne not implemented in ${this.constructor.name}!`);
    }
}