import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class UpdateTemplateTypeStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        templateTypeService = null
    } = {}) {
        super();
        this.result = result;
        this.templateTypeService = templateTypeService;
    }

    async execute({templateType, filter}, result = this.result) {
        try {
            const response = await this.templateTypeService.updateTemplateType(templateType, filter);

            const count = response.count;
            const resultTemplateType = response.templateType;

            if(count === 0) {
                result.status = 400;
            } else {
                result.status = 200;
                result.data = [resultTemplateType];
            }
            result.count = count;
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