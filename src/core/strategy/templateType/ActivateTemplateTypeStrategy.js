import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';
import { ATIVO } from '../../enum/StatusEnum.js'


export default class ActivateTemplateTypeStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({templateType}, result = this.result) {
        templateType.status = ATIVO;

        return {
            entity: {templateType},
            result
        };
    }
}