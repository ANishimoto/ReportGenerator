import AbstractDTO from "../AbstractDTO.js";

export default class UserDTO extends AbstractDTO{
    constructor({
        id = null,
        login = '',
        password = '',
        confirm_password = '',
        status = null
    } = {}) {
        super();
        this.id = id;
        this.login = login;
        this.password = password;
        this.confirm_password = confirm_password;
        this.status = status;
    }
}