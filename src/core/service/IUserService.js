export default class IUserService {
    constructor () {
        if (!this.createUser) throw new Error(`Method createUser not implemented in ${this.constructor.name}!`);
        if (!this.findAllUsers) throw new Error(`Method findAllUsers not implemented in ${this.constructor.name}!`);
        if (!this.findOneUser) throw new Error(`Method findOneUser not implemented in ${this.constructor.name}!`);
        if (!this.deleteUser) throw new Error(`Method deleteUser not implemented in ${this.constructor.name}!`);
        if (!this.updateUser) throw new Error(`Method updateUser not implemented in ${this.constructor.name}!`);
    }
}