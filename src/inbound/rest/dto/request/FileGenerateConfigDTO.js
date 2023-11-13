import AbstractDTO from "../AbstractDTO.js";

export default class FileGenerateConfigDTO extends AbstractDTO {
    constructor({
        template = null,
        originalname = '',
        filename = '',
        path = '',
    } = {}) {
        super();
        this.template = template;
        this.originalName = originalname;
        this.fileName = filename;
        this.path = path.replace('\\', '/');
    }
}