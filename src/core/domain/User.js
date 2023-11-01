import AbstractEntity from "./AbstractEntity.js";

export default class User extends AbstractEntity {
    constructor({
        id = null,
        login = '',
        password = '',
        confirm_password = '',
        token = '',
        status = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        super();
        this.id = id;
        this.login = login;
        this.password = password;
        this.confirm_password = confirm_password;
        this.token = token;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}