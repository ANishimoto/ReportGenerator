import AbstractController from "./AbstractController.js";
import UserFilter from "../filter/UserFilter.js";
import UserFilterMapper from "../filter/mapper/UserFilterMapper.js";
import UserService from "../../../outbound/service/UserService.js";
import UserRepository from "../../../outbound/database/orm/sequelize/repository/UserRepository.js";
import UserMapper from "../dto/mapper/UserMapper.js";
import UserDTO from "../dto/request/UserDTO.js";
import CreateUserUseCaseFactory from "../../../core/useCaseFactory/user/CreateUserUseCaseFactory.js";
import FindAllUsersUseCaseFactory from "../../../core/useCaseFactory/user/FindAllUsersUseCaseFactory.js";
import FindOneUserUseCaseFactory from "../../../core/useCaseFactory/user/FindOneUserUseCaseFactory.js";
import DeleteUserUseCaseFactory from "../../../core/useCaseFactory/user/DeleteUserUseCaseFactory.js";
import UpdateUserUseCaseFactory from "../../../core/useCaseFactory/user/UpdateUserUseCaseFactory.js";

export default class UserController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.userMapper = new UserMapper();
        this.userFilterMapper = new UserFilterMapper();
        this.userRepository = UserRepository;
        this.userService = UserService;

        this.createUserUseCaseFactory = new CreateUserUseCaseFactory({
            userService: this.userService,
            userRepository: this.userRepository,
        });

        this.findAllUsersUseCaseFactory = new FindAllUsersUseCaseFactory({
            userService: this.userService,
            userRepository: this.userRepository,
        });

        this.findOneUserUseCaseFactory = new FindOneUserUseCaseFactory({
            userService: this.userService,
            userRepository: this.userRepository,
        });

        this.deleteUserUseCaseFactory = new DeleteUserUseCaseFactory({
            userService: this.userService,
            userRepository: this.userRepository,
        });

        this.updateUserUseCaseFactory = new UpdateUserUseCaseFactory({
            userService: this.userService,
            userRepository: this.userRepository,
        });
    }

    async create(req, res) {
        try {
            const userDTO = new UserDTO(req.body);
            const user = this.userMapper.adaptRequestDTOToEntity(userDTO);
            
            const createUserUseCase = this.createUserUseCaseFactory.build();
            const result = await createUserUseCase.execute({user});
    
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
    
            const findAllUsersUseCase = this.findAllUsersUseCaseFactory.build();
            const result = await findAllUsersUseCase.execute(filter);
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
    
    
            const findOneUserUseCase = this.findOneUserUseCaseFactory.build();
            const result = await findOneUserUseCase.execute(filter);
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
    
            const deleteUserUseCase = this.deleteUserUseCaseFactory.build();
            const result = await deleteUserUseCase.execute(filter);
    
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
            
    
            const updateUserUseCase = this.updateUserUseCaseFactory.build();
            const result = await updateUserUseCase.execute(user, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }
}