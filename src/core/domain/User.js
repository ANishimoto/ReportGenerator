import AbstractEntity from "./AbstractEntity.js";

export default class User extends AbstractEntity {
    constructor({
        id = null,
        login = '',
        password = '',
        token = '',
        status = null
    } = {}) {
        super();
        this.id = id;
        this.login = login;
        this.password = password;
        this.token = token;
        this.status = status;
    }
}