import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindOneTemplateStrategy extends AbstractStrategy {
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
            const {count, template} = await this.templateService.findOneTemplate(filter);
            result.status = (!template) ? 204 : 200;
            result.data = [template];
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