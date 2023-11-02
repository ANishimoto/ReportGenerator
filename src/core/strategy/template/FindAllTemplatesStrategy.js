import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindAllTemplatesStrategy extends AbstractStrategy {
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
            const {count, templates} = await this.templateService.findAllTemplates(filter);
            result.status = (templates.length === 0) ? 204 : 200;
            result.data = templates;
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