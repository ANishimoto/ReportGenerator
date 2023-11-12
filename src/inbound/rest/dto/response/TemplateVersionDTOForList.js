import AbstractDTO from "../AbstractDTO.js";

export default class TemplateVersionDTOForList extends AbstractDTO {
    constructor({
        id = null,
        content = '',
        status = null,
    } = {}) {
        super();
        this.id = id;
        this.content = content;
        this.status = status;
    }
}