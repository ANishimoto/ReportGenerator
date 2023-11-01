import AbstractDTO from "../AbstractDTO.js";

export default class UserDTOForList extends AbstractDTO {
    constructor({
        id = null,
        login = '',
        status = null
    } = {}) {
        super();
        this.id = id;
        this.login = login;
        this.status = status;
    }
}