import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateUserFieldsStrategy from "../../strategy/user/ValidateUserFieldsStrategy.js";
import UpdateUserStrategy from "../../strategy/user/UpdateUserStrategy.js";

export default class UpdateUserUseCase extends AbstractUseCase {
    constructor ({
        userService = null
    } = {}) {
        super();
        this.userService = userService;
        this.strategies = [
            new ValidateUserFieldsStrategy(),
            new UpdateUserStrategy({
                userService: this.userService
            }),
        ];
    }

    async updateUser(user, filter) {
        return await this.executeStrategies({user, filter}, new Result());
    }
}