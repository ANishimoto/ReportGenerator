import Result from "../../util/Result.js";
import AbstractUseCase from "../AbstractUseCase.js";

//strategies
import ValidateUserFieldsStrategy from "../../strategy/user/ValidateUserFieldsStrategy.js";
import ActivateUserStrategy from "../../strategy/user/ActivateUserStrategy.js";
import SaveUserStrategy from "../../strategy/user/SaveUserStrategy.js";
import CreatePasswordHashStrategy from "../../strategy/user/CreatePasswordHashStrategy.js";

export default class CreateUserUseCase extends AbstractUseCase {
    constructor ({
        userService = null
    } = {}) {
        super();
        this.userService = userService;
        this.strategies = [
            new ValidateUserFieldsStrategy({
                userService: this.userService
            }),
            new ActivateUserStrategy(),
            new CreatePasswordHashStrategy(),
            new SaveUserStrategy({
                userService: this.userService
            }),
        ];
    }

    async createUser({user}) {
        return await this.executeStrategies({user}, new Result());
    }
}