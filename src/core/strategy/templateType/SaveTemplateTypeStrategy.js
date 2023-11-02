import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class SaveTemplateTypeStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateTypeService = null
    } = {}) {
        super();
        this.result = result;
        this.templateTypeService = templateTypeService;
    }

    async execute({templateType}, result = this.result) {
        try {
            templateType = await this.templateTypeService.createTemplateType(templateType);
            result.status = 201;
            result.data = [templateType];
        } catch (error) {
            result.status = 500;
            result.error.push(error.message);
        }

        return {
            entity: {templateType},
            result
        };
    }
}