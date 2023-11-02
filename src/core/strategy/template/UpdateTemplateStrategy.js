import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class UpdateTemplateStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateService = null
    } = {}) {
        super();
        this.result = result;
        this.templateService = templateService;
    }

    async execute({template, filter}, result = this.result) {
        try {
            const response = await this.templateService.updateTemplate(template, filter);

            const count = response.count;
            const resultTemplate = response.template;

            if(count === 0) {
                result.status = 400;
            } else {
                result.status = 200;
                result.data = [resultTemplate];
            }
            result.count = count;
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