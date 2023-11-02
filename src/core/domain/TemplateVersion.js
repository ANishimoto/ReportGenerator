import AbstractEntity from "./AbstractEntity.js";

export default class TemplateVersion extends AbstractEntity {
    constructor({
        id = null,
        content = '',
        status = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        super();
        this.id = id;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}