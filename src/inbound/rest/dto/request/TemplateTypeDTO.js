import AbstractDTO from "../AbstractDTO.js";

export default class TemplateTypeDTO extends AbstractDTO {
    constructor({
        id = null,
        name = '',
        status = null
    } = {}) {
        super();
        this.id = id;
        this.name = name;
        this.status = status;
    }
}