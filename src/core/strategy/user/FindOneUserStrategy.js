import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindOneUserStrategy extends AbstractStrategy {
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
            const {count, user} = await this.userService.findOneUser(filter);
            result.status = 200;
            result.data = [user];
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