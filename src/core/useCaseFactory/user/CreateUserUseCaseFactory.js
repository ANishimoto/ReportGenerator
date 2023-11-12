import CreateUserUseCase from "../../useCase/user/CreateUserUseCase.js";

export default class CreateUserUseCaseFactory {
    constructor ({
        userService = null,
        userRepository = null,
    } = {}) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    build() {
        return new CreateUserUseCase({
            userService: new this.userService({
                userRepository: new this.userRepository()
            }),
        })
    }
}