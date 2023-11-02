import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindOneTemplateTypeStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateTypeService = null
    } = {}) {
        super();
        this.result = result;
        this.templateTypeService = templateTypeService;
    }

    async execute(filter, result = this.result) {
        try {
            const {count, templateType} = await this.templateTypeService.findOneTemplateType(filter);
            result.status = (!templateType) ? 204 : 200;
            result.data = [templateType];
            result.count = count;
        } catch (error) {
            result.status = 500;
            result.error.push(error.message);
        }

        return {
            entity: filter,
            result
        };
    }
}