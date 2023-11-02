import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class DeleteTemplateTypeStrategy extends AbstractStrategy {
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
            await this.templateTypeService.deleteTemplateType(filter);
            result.status = 200;
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