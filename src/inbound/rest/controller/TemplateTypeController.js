import AbstractController from "./AbstractController.js";
import TemplateTypeService from "../../../outbound/service/TemplateTypeService.js";
import CreateTemplateTypeUseCase from '../../../core/useCase/templateType/CreateTemplateTypeUseCase.js';
import FindAllTemplateTypesUseCase from "../../../core/useCase/templateType/FindAllTemplateTypesUseCase.js";
import FindOneTemplateTypeUseCase from "../../../core/useCase/templateType/FindOneTemplateTypeUseCase.js";
import DeleteTemplateTypeUseCase from "../../../core/useCase/templateType/DeleteTemplateTypeUseCase.js";
import UpdateTemplateTypeUseCase from "../../../core/useCase/templateType/UpdateTemplateTypeUseCase.js";
import TemplateTypeFilter from "../filter/TemplateTypeFilter.js";
import TemplateTypeFilterMapper from "../filter/mapper/TemplateTypeFilterMapper.js";
import TemplateTypeRepository from "../../../outbound/database/orm/sequelize/repository/TemplateTypeRepository.js";
import TemplateTypeDTO from "../dto/request/TemplateTypeDTO.js";
import TemplateTypeMapper from "../dto/mapper/TemplateTypeMapper.js";

export default class TemplateTypeTypeController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.templateTypeMapper = new TemplateTypeMapper();
        this.templateTypeRepository = new TemplateTypeRepository();
        this.templateTypeService = new TemplateTypeService({
            templateTypeRepository: this.templateTypeRepository
        });
        this.createTemplateTypeUseCase = new CreateTemplateTypeUseCase({
            templateTypeService: this.templateTypeService
        });
        this.findAllTemplateTypesUseCase = new FindAllTemplateTypesUseCase({
            templateTypeService: this.templateTypeService
        });
        this.findOneTemplateTypeUseCase = new FindOneTemplateTypeUseCase({
            templateTypeService: this.templateTypeService
        });
        this.deleteTemplateTypeUseCase = new DeleteTemplateTypeUseCase({
            templateTypeService: this.templateTypeService
        });
        this.updateTemplateTypeUseCase = new UpdateTemplateTypeUseCase({
            templateTypeService: this.templateTypeService
        });
        this.templateTypeFilterMapper = new TemplateTypeFilterMapper();
    }

    async create(req, res) {
        try {
            const templateTypeDTO = new TemplateTypeDTO(req.body);
            const templateType = this.templateTypeMapper.adaptRequestDTOToEntity(templateTypeDTO);
            const result = await this.createTemplateTypeUseCase.execute({templateType});
    
            result.data = null;
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }

    async findAll(req, res) {
        try {
            const templateTypeFilter = new TemplateTypeFilter(req);
            const filter = this.templateTypeFilterMapper.adapt(templateTypeFilter);

            const result = await this.findAllTemplateTypesUseCase.findAllTemplateTypes(filter);
            const formatedResponseData = [];

            for (const data of result.data) {
                formatedResponseData.push(this.templateTypeMapper.adaptEntityToResponseDTOForList(data));
            }

            result.data = formatedResponseData;

            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }

    async findOne(req, res) {
        try {
            const templateTypeFilter = new TemplateTypeFilter(req);
            const filter = this.templateTypeFilterMapper.adapt(templateTypeFilter);
    
            const result = await this.findOneTemplateTypeUseCase.findOneTemplateType(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                if (data) {
                    formatedResponseData.push(this.templateTypeMapper.adaptEntityToResponseDTOForList(data));
                }
            }
    
            result.data = formatedResponseData;
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }

    async delete(req, res) {
        try {
            const templateTypeFilter = new TemplateTypeFilter(req);
            const filter = this.templateTypeFilterMapper.adapt(templateTypeFilter);
    
            const result = await this.deleteTemplateTypeUseCase.deleteTemplateType(filter);
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }

    async update(req, res) {
        try {
            const templateTypeFilter = new TemplateTypeFilter(req);
            const filter = this.templateTypeFilterMapper.adapt(templateTypeFilter);
    
            const templateTypeDTO = new TemplateTypeDTO(req.body);
            templateTypeDTO.id = req.params.id;
            const templateType = this.templateTypeMapper.adaptRequestDTOToEntity(templateTypeDTO);
            
            const result = await this.updateTemplateTypeUseCase.updateTemplateType({templateType}, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }
}