import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class FindAllUsersStrategy extends AbstractStrategy {
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
            const {count, users} = await this.userService.findAllUsers(filter);
            result.status = 200;
            result.data = users;
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