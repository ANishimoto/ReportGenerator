import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class SaveTemplateStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateService = null
    } = {}) {
        super();
        this.result = result;
        this.templateService = templateService;
    }

    async execute({template}, result = this.result) {
        try {
            template = await this.templateService.createTemplate(template);
            result.status = 201;
            result.data = [template];
        } catch (error) {
            result.status = 500;
            result.error.push(error.message);
        }

        return {
            entity: {template},
            result
        };
    }
}