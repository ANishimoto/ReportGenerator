import DeleteUserUseCase from "../../useCase/user/DeleteUserUseCase.js";

export default class DeleteUserUseCaseFactory {
    constructor ({
        userService = null,
        userRepository = null,
    } = {}) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    build() {
        return new DeleteUserUseCase({
            userService: new this.userService({
                userRepository: new this.userRepository()
            }),
        })
    }
}