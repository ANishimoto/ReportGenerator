import AbstractStrategy from '../AbstractStrategy.js';
import Result from '../../util/Result.js';

export default class UpdateUserStrategy extends AbstractStrategy {
    constructor ({
        result = new Result(),
        userService = null
    } = {}) {
        super();
        this.result = result;
        this.userService = userService;
    }

    async execute({user, filter}, result = this.result) {
        try {
            const response = await this.userService.updateUser(user, filter);

            const count = response.count;
            const resultUser = response.user;

            if(count === 0) {
                result.status = 400;
            } else {
                result.status = 200;
                result.data = [resultUser];
            }
            result.count = count;
        } catch (error) {
            result.status = 500;
            result.error.push(error.message);
        }

        return {
            entity: {user},
            result
        };
    }
}