import FindAllUsersUseCase from "../../useCase/user/FindAllUsersUseCase.js";

export default class FindAllUsersUseCaseFactory {
    constructor ({
        userService = null,
        userRepository = null,
    } = {}) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    build() {
        return new FindAllUsersUseCase({
            userService: new this.userService({
                userRepository: new this.userRepository()
            }),
        })
    }
}