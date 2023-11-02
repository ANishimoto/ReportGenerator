import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class DeleteTemplateStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateService = null
    } = {}) {
        super();
        this.result = result;
        this.templateService = templateService;
    }

    async execute(filter, result = this.result) {
        try {
            await this.templateService.deleteTemplate(filter);
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