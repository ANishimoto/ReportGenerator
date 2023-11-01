import AbstractDTO from "../AbstractDTO.js";

export default class TokenDTO extends AbstractDTO {
    constructor({
        token = null
    } = {}) {
        super();
        this.token = token;
    }
}