import UpdateUserUseCase from "../../useCase/user/UpdateUserUseCase.js";

export default class UpdateUserUseCaseFactory {
    constructor ({
        userService = null,
        userRepository = null,
    } = {}) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    build() {
        return new UpdateUserUseCase({
            userService: new this.userService({
                userRepository: new this.userRepository()
            }),
        })
    }
}