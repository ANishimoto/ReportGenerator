import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class DeleteUserStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        userService = null
    } = {}) {
        super();
        this.result = result;
        this.userService = userService;
    }

    async execute(filter, result = this.result) {
        try {
            await this.userService.deleteUser(filter);
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