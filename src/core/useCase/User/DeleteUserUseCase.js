import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import DeleteUserStrategy from "../../strategy/user/DeleteUserStrategy.js";

export default class DeleteUserUseCase extends AbstractUseCase {
    constructor ({
        userService = null
    } = {}) {
        super();
        this.userService = userService;
        this.strategies = [
            new DeleteUserStrategy({
                userService: this.userService
            }),
        ];
    }

    async deleteUser(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}