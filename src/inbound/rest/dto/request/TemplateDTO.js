import AbstractDTO from "../AbstractDTO.js";

export default class TemplateDTO extends AbstractDTO {
    constructor({
        id = null,
        title = '',
        type = null, 
        content = '',
        status = null,
    } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.status = status;
    }
}