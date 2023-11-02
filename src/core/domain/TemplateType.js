import AbstractEntity from "./AbstractEntity.js";

export default class TemplateType extends AbstractEntity {
    constructor({
        id = null,
        name = '',
        status = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        super();
        this.id = id;
        this.name = name;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}