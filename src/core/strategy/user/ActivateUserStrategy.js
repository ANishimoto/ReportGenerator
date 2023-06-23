import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';
import { ATIVO } from '../../enum/StatusEnum.js'


export default class ActivateUserStrategy extends AbstractStrategy {
    constructor ({
        result = new Result()
    } = {}) {
        super();
        this.result = result;
    }

    async execute({user}, result = this.result) {
        user.status = ATIVO;

        return {
            entity: {user},
            result
        };
    }
}