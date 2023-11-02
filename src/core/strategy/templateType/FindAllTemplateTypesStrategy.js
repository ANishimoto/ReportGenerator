import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindAllTemplateTypesStrategy extends AbstractStrategy {
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
            const {count, templateTypes} = await this.templateTypeService.findAllTemplateTypes(filter);
            result.status = (templateTypes.length === 0) ? 204 : 200;
            result.data = templateTypes;
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