import AbstractEntity from "./AbstractEntity.js";

export default class Template extends AbstractEntity {
    constructor({
        id = null,
        title = '',
        status = null,
        createdAt = null,
        updatedAt = null,
        templateType = null,
        templateVersions = []
    } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.templateType = templateType;
        this.templateVersions = templateVersions;
    }
}