import AbstractDTO from "../AbstractDTO.js";

export default class LoginDTO extends AbstractDTO {
    constructor({
        login = '',
        password = ''
    } = {}) {
        super();
        this.login = login;
        this.password = password;
    }
}