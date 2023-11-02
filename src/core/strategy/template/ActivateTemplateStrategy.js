import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';
import { ATIVO } from '../../enum/StatusEnum.js'


export default class ActivateTemplateStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({template}, result = this.result) {
        template.status = ATIVO;

        for (const templateVersion of template.templateVersions) {
            templateVersion.status = ATIVO;
        }

        return {
            entity: {template},
            result
        };
    }
}