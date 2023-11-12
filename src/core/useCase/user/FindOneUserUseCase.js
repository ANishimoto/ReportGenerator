import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindOneUserStrategy from "../../strategy/user/FindOneUserStrategy.js";

export default class FindOneUserUseCase extends AbstractUseCase {
    constructor ({
        userService = null
    } = {}) {
        super();
        this.userService = userService;
        this.strategies = [
            new FindOneUserStrategy({
                userService: this.userService
            }),
        ];
    }

    async execute(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}