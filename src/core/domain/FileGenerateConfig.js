import AbstractEntity from "./AbstractEntity.js";
import Template from "./Template.js";

export default class FileGenerateConfig extends AbstractEntity {
    constructor({
        template = new Template(),
        originalName = '',
        fileName = '',
        path = '',
        outputFileName = '',
        outputFileExtension = '',
        data = {},
        pdfOptions = {}
    } = {}) {
        super();
        this.template = template;
        this.originalName = originalName;
        this.fileName = fileName;
        this.path = path;
    }
}