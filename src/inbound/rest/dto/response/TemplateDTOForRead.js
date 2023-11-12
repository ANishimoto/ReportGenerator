import AbstractDTO from "../AbstractDTO.js";

export default class TemplateDTOForRead extends AbstractDTO {
    constructor({
        id = null,
        title = '',
        status = null,
        type = null,
        currentVersion = null
    } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.status = status;
        this.type = type;
        this.currentVersion = currentVersion
    }
}