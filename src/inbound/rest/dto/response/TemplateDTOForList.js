import AbstractDTO from "../AbstractDTO.js";

export default class TemplateDTOForList extends AbstractDTO {
    constructor({
        id = null,
        title = '',
        status = null,
        type = null,
    } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.status = status;
        this.type = type;
    }
}