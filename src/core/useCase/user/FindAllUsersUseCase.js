import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import FindAllUsersStrategy from "../../strategy/user/FindAllUsersStrategy.js";

export default class FindAllUsersUseCase extends AbstractUseCase {
    constructor ({
        userService = null
    } = {}) {
        super();
        this.userService = userService;
        this.strategies = [
            new FindAllUsersStrategy({
                userService: this.userService
            }),
        ];
    }

    async execute(filter) {
        return await this.executeStrategies(filter, new Result());
    }
}