import IUserService from '../../core/service/IUserService.js';
import UserFilterMapper from '../database/orm/sequelize/filter/mapper/UserFilterMapper.js';
import UserMapper from '../database/orm/sequelize/model/mapper/UserMapper.js';
import UserRepository from '../database/orm/sequelize/repository/UserRepository.js';

export default class UserService extends IUserService {
    constructor({
        userRepository = null
    } = {}) {
        super();
        this.createUser = this.createUser.bind(this);
        this.findAllUsers = this.findAllUsers.bind(this);
        this.findOneUser = this.findOneUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.userRepository = new UserRepository();
        this.userMapper =  new UserMapper();
        this.userFilterMapper = new UserFilterMapper();
    }

    async createUser(user) {
        const userModel = await this.userRepository.save(user);
        return this.userMapper.adapt(userModel);
    }

    async findAllUsers(filter) {
        const userFilter = this.userFilterMapper.adapt(filter);
        filter = userFilter.mountFilter();

        const userModels = await this.userRepository.findAll(filter);

        const users = [];
        for (const userModel of userModels.rows) {
            users.push(this.userMapper.adapt(userModel));
        }
        return {
            users,
            count: userModels.count
        };
    }

    async findOneUser(filter) {
        const userFilter = this.userFilterMapper.adapt(filter);
        filter = userFilter.mountFilter();

        const userModel = await this.userRepository.findOne(filter);
        
        if (!userModel) return null;

        return {
            user: this.userMapper.adapt(userModel),
            count: 1
        };
    }

    async deleteUser(filter) {
        const userFilter = this.userFilterMapper.adapt(filter);
        filter = userFilter.mountFilter();

        await this.userRepository.delete(filter);
        
        return;
    }

    async updateUser(user, filter) {
        const userFilter = this.userFilterMapper.adapt(filter);
        filter = userFilter.mountFilter();

        const response = await this.userRepository.update(user, filter);

        user = (response.user) ? this.userMapper.adapt(response.user): null;

        return {
            user,
            count: response.count
        };
    }
}