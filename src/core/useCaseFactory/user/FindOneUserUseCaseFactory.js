import FindOneUserUseCase from "../../useCase/user/FindOneUserUseCase.js";

export default class FindOneUserUseCaseFactory {
    constructor ({
        userService = null,
        userRepository = null,
    } = {}) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    build() {
        return new FindOneUserUseCase({
            userService: new this.userService({
                userRepository: new this.userRepository()
            }),
        })
    }
}