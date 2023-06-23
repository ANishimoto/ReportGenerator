import AbstractModel from "./AbstractModel.js";

export default class UserModel extends AbstractModel{
    constructor({
        id = null,
        login = '',
        password = '',
        status = null
    } = {}) {
        super();
        this.id = id;
        this.login = login;
        this.password = password;
        this.status = status;
    }
}