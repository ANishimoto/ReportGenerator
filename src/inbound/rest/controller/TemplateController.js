import AbstractController from "./AbstractController.js";
import TemplateService from "../../../outbound/service/TemplateService.js";
import CreateTemplateUseCase from '../../../core/useCase/template/CreateTemplateUseCase.js';
import FindAllTemplatesUseCase from "../../../core/useCase/template/FindAllTemplatesUseCase.js";
import FindOneTemplateUseCase from "../../../core/useCase/template/FindOneTemplateUseCase.js";
import DeleteTemplateUseCase from "../../../core/useCase/template/DeleteTemplateUseCase.js";
import UpdateTemplateUseCase from "../../../core/useCase/template/UpdateTemplateUseCase.js";
import TemplateFilter from "../filter/TemplateFilter.js";
import TemplateFilterMapper from "../filter/mapper/TemplateFilterMapper.js";
import TemplateRepository from "../../../outbound/database/orm/sequelize/repository/TemplateRepository.js";
import TemplateDTO from "../dto/request/TemplateDTO.js";
import TemplateMapper from "../dto/mapper/TemplateMapper.js";

export default class TemplateController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.templateMapper = new TemplateMapper();
        this.templateRepository = new TemplateRepository();
        this.templateService = new TemplateService({
            templateRepository: this.templateRepository
        });
        this.createTemplateUseCase = new CreateTemplateUseCase({
            templateService: this.templateService
        });
        this.findAllTemplatesUseCase = new FindAllTemplatesUseCase({
            templateService: this.templateService
        });
        this.findOneTemplateUseCase = new FindOneTemplateUseCase({
            templateService: this.templateService
        });
        this.deleteTemplateUseCase = new DeleteTemplateUseCase({
            templateService: this.templateService
        });
        this.updateTemplateUseCase = new UpdateTemplateUseCase({
            templateService: this.templateService
        });
        this.templateFilterMapper = new TemplateFilterMapper();
    }

    async create(req, res) {
        try {
            const templateDTO = new TemplateDTO(req.body);
            const template = this.templateMapper.adaptRequestDTOToEntity(templateDTO);
            const result = await this.createTemplateUseCase.execute({template});
    
            result.data = null;
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }

    async findAll(req, res) {
        try {
            const templateFilter = new TemplateFilter(req);
            const filter = this.templateFilterMapper.adapt(templateFilter);
    
            const result = await this.findAllTemplatesUseCase.findAllTemplates(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                formatedResponseData.push(this.templateMapper.adaptEntityToResponseDTOForList(data));
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
            const templateFilter = new TemplateFilter(req);
            const filter = this.templateFilterMapper.adapt(templateFilter);
    
            const result = await this.findOneTemplateUseCase.findOneTemplate(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                if (data) {
                    formatedResponseData.push(this.templateMapper.adaptEntityToResponseDTOForList(data));
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
            const templateFilter = new TemplateFilter(req);
            const filter = this.templateFilterMapper.adapt(templateFilter);
    
            const result = await this.deleteTemplateUseCase.deleteTemplate(filter);
    
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }

    async update(req, res) {
        try {
            const templateFilter = new TemplateFilter(req);
            const filter = this.templateFilterMapper.adapt(templateFilter);
    
            const templateDTO = new TemplateDTO(req.body);
            templateDTO.id = req.params.id;
            const template = this.templateMapper.adaptRequestDTOToEntity(templateDTO);
            
            const result = await this.updateTemplateUseCase.updateTemplate({template}, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }
}