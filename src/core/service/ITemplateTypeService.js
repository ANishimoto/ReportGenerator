export default class ITemplateTypeService {
    constructor () {
        if (!this.createTemplateType) throw new Error(`Method createTemplateType not implemented in ${this.constructor.name}!`);
        if (!this.findAllTemplateTypes) throw new Error(`Method findAllTemplateTypes not implemented in ${this.constructor.name}!`);
        if (!this.findOneTemplateType) throw new Error(`Method findOneTemplateType not implemented in ${this.constructor.name}!`);
        if (!this.deleteTemplateType) throw new Error(`Method deleteTemplateType not implemented in ${this.constructor.name}!`);
        if (!this.updateTemplateType) throw new Error(`Method updateTemplateType not implemented in ${this.constructor.name}!`);
    }
}