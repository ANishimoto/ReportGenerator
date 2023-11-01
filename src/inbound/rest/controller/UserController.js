import UserService from "../../../outbound/service/UserService.js";
import AbstractController from "./AbstractController.js";
import CreateUserUseCase from '../../../core/useCase/user/CreateUserUseCase.js';
import FindAllUsersUseCase from "../../../core/useCase/user/FindAllUsersUseCase.js";
import FindOneUserUseCase from "../../../core/useCase/user/FindOneUserUseCase.js";
import UserFilter from "../filter/UserFilter.js";
import UserFilterMapper from "../filter/mapper/UserFilterMapper.js";
import DeleteUserUseCase from "../../../core/useCase/user/DeleteUserUseCase.js";
import UpdateUserUseCase from "../../../core/useCase/user/UpdateUserUseCase.js";
import UserRepository from "../../../outbound/database/orm/sequelize/repository/UserRepository.js";
import UserMapper from "../dto/mapper/UserMapper.js";
import UserDTO from "../dto/request/UserDTO.js";

export default class UserController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.userMapper = new UserMapper();
        this.userRepository = new UserRepository();
        this.userService = new UserService({
            userRepository: this.userRepository
        });
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

    async create(req, res) {
        try {
            const userDTO = new UserDTO(req.body);
            const user = this.userMapper.adaptRequestDTOToEntity(userDTO);
            const result = await this.createUserUseCase.createUser({user});
    
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }

    async findAll(req, res) {
        try {
            const userFilter = new UserFilter(req);
            const filter = this.userFilterMapper.adapt(userFilter);
    
            const result = await this.findAllUsersUseCase.findAllUsers(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                formatedResponseData.push(this.userMapper.adaptEntityToResponseDTOForList(data));
            }
    
            result.data = formatedResponseData;
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }

    async findOne(req, res) {
        try {
            const userFilter = new UserFilter(req);
            const filter = this.userFilterMapper.adapt(userFilter);
    
            const result = await this.findOneUserUseCase.findOneUser(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                if (data) {
                    formatedResponseData.push(this.userMapper.adaptEntityToResponseDTOForList(data));
                }
            }
    
            result.data = formatedResponseData;
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }

    async delete(req, res) {
        try {
            const userFilter = new UserFilter(req);
            const filter = this.userFilterMapper.adapt(userFilter);
    
            const result = await this.deleteUserUseCase.deleteUser(filter);
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }

    async update(req, res) {
        try {
            const userFilter = new UserFilter(req);
            const filter = this.userFilterMapper.adapt(userFilter);
    
            const userDTO = new UserDTO(req.body);
            userDTO.id = req.params.id;
            const user = this.userMapper.adaptRequestDTOToEntity(userDTO);
            
            const result = await this.updateUserUseCase.updateUser(user, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }
}