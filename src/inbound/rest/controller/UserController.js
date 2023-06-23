import UserService from "../../../outbound/service/UserService.js";
import UserMapper from "../model/mapper/UserMapper.js";
import UserModel from "../model/UserModel.js";
import AbstractController from "./AbstractController.js";
import CreateUserUseCase from '../../../core/useCase/User/CreateUserUseCase.js';
import FindAllUsersUseCase from "../../../core/useCase/User/FindAllUsersUseCase.js";
import FindOneUserUseCase from "../../../core/useCase/User/FindOneUserUseCase.js";
import UserFilter from "../filter/UserFilter.js";
import UserFilterMapper from "../filter/mapper/UserFilterMapper.js";
import DeleteUserUseCase from "../../../core/useCase/User/DeleteUserUseCase.js";
import UpdateUserUseCase from "../../../core/useCase/User/UpdateUserUseCase.js";

export default class UserController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.userMapper = new UserMapper();
        this.userService = new UserService();
        this.createUserUseCase = new CreateUserUseCase({
            userService: this.userService
        });
        this.findAllUsersUseCase = new FindAllUsersUseCase({
            userService: this.userService
        });
        this.findOneUserUseCase = new FindOneUserUseCase({
            userService: this.userService
        });
        this.deleteUserUseCase = new DeleteUserUseCase({
            userService: this.userService
        });
        this.updateUserUseCase = new UpdateUserUseCase({
            userService: this.userService
        });
        this.userFilterMapper = new UserFilterMapper();
    }

    async create(req, res, next) {
        const userModel = new UserModel(req.body);
        const user = this.userMapper.adapt(userModel);
        const result = await this.createUserUseCase.createUser({user});
        const formatedResponseData = [];

        for (const data of result.data) {
            formatedResponseData.push(this.userMapper.adapt(data));
        }

        result.data = formatedResponseData;
        res.status(result.status);
        res.send(result);
    }

    async findAll(req, res, next) {
        const userFilter = new UserFilter(req);
        const filter = this.userFilterMapper.adapt(userFilter);

        const result = await this.findAllUsersUseCase.findAllUsers(filter);
        const formatedResponseData = [];

        for (const data of result.data) {
            formatedResponseData.push(this.userMapper.adapt(data));
        }

        result.data = formatedResponseData;

        res.status(result.status);
        res.send(result);
    }

    async findOne(req, res, next) {
        const userFilter = new UserFilter(req);
        const filter = this.userFilterMapper.adapt(userFilter);

        const result = await this.findOneUserUseCase.findOneUser(filter);
        const formatedResponseData = [];

        for (const data of result.data) {
            if (data) {
                formatedResponseData.push(this.userMapper.adapt(data));
            }
        }

        result.data = formatedResponseData;

        res.status(result.status);
        res.send(result);
    }

    async delete(req, res, next) {
        const userFilter = new UserFilter(req);
        const filter = this.userFilterMapper.adapt(userFilter);

        const result = await this.deleteUserUseCase.deleteUser(filter);

        res.status(result.status);
        res.send(result);
    }

    async update(req, res, next) {
        const userFilter = new UserFilter(req);
        const filter = this.userFilterMapper.adapt(userFilter);

        const userModel = new UserModel(req.body);
        userModel.id = req.params.id;
        const user = this.userMapper.adapt(userModel);
        
        const result = await this.updateUserUseCase.updateUser(user, filter);
        const formatedResponseData = [];

        for (const data of result.data) {
            formatedResponseData.push(this.userMapper.adapt(data));
        }

        result.data = formatedResponseData;
        res.status(result.status);
        res.send(result);
    }
}