export default class ITemplateService {
    constructor () {
        if (!this.createTemplate) throw new Error(`Method createTemplate not implemented in ${this.constructor.name}!`);
        if (!this.findAllTemplates) throw new Error(`Method findAllTemplates not implemented in ${this.constructor.name}!`);
        if (!this.findOneTemplate) throw new Error(`Method findOneTemplate not implemented in ${this.constructor.name}!`);
        if (!this.deleteTemplate) throw new Error(`Method deleteTemplate not implemented in ${this.constructor.name}!`);
        if (!this.updateTemplate) throw new Error(`Method updateTemplate not implemented in ${this.constructor.name}!`);
    }
}