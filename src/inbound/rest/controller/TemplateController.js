import AbstractController from "./AbstractController.js";
import TemplateService from "../../../outbound/service/TemplateService.js";
import TemplateFilter from "../filter/TemplateFilter.js";
import TemplateFilterMapper from "../filter/mapper/TemplateFilterMapper.js";
import TemplateRepository from "../../../outbound/database/orm/sequelize/repository/TemplateRepository.js";
import TemplateDTO from "../dto/request/TemplateDTO.js";
import TemplateMapper from "../dto/mapper/TemplateMapper.js";
import CreateTemplateUseCaseFactory from "../../../core/useCaseFactory/template/CreateTemplateUseCaseFactory.js";
import FindAllTemplatesUseCaseFactory from "../../../core/useCaseFactory/template/FindAllTemplatesUseCaseFactory.js";
import FindOneTemplateUseCaseFactory from "../../../core/useCaseFactory/template/FindOneTemplateUseCaseFactory.js";
import DeleteTemplateUseCaseFactory from "../../../core/useCaseFactory/template/DeleteTemplateUseCaseFactory.js";
import UpdateTemplateUseCaseFactory from "../../../core/useCaseFactory/template/UpdateTemplateUseCaseFactory.js";

export default class TemplateController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.templateRepository = TemplateRepository;
        this.templateService = TemplateService;
        this.templateMapper = new TemplateMapper();
        this.templateFilterMapper = new TemplateFilterMapper();
        
        this.createTemplateUseCaseFactory = new CreateTemplateUseCaseFactory({
            templateService: this.templateService,
            templateRepository: this.templateRepository,
        });
        
        this.findAllTemplatesUseCaseFactory = new FindAllTemplatesUseCaseFactory({
            templateService: this.templateService,
            templateRepository: this.templateRepository,
        });
        
        this.findOneTemplateUseCaseFactory = new FindOneTemplateUseCaseFactory({
            templateService: this.templateService,
            templateRepository: this.templateRepository,
        });
        
        this.deleteTemplateUseCaseFactory = new DeleteTemplateUseCaseFactory({
            templateService: this.templateService,
            templateRepository: this.templateRepository,
        });
        
        this.updateTemplateUseCaseFactory = new UpdateTemplateUseCaseFactory({
            templateService: this.templateService,
            templateRepository: this.templateRepository,
        });
    }

    async create(req, res) {
        try {
            const templateDTO = new TemplateDTO(req.body);
            const template = this.templateMapper.adaptRequestDTOToEntity(templateDTO);
            
            const createTemplateUseCase = this.createTemplateUseCaseFactory.build();
            const result = await createTemplateUseCase.execute({template});
    
            result.data = null;
            res.status(result.status);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.end();
        }
    }

    async findAll(req, res) {
        try {
            const templateFilter = new TemplateFilter(req);
            const filter = this.templateFilterMapper.adapt(templateFilter);
            
            const findAllTemplatesUseCase = this.findAllTemplatesUseCaseFactory.build();
            const result = await findAllTemplatesUseCase.execute(filter);
    
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
    
            const findOneTemplateUseCase = this.findOneTemplateUseCaseFactory.build();
            const result = await findOneTemplateUseCase.execute(filter);
            const formatedResponseData = [];
    
            for (const data of result.data) {
                if (data) {
                    formatedResponseData.push(this.templateMapper.adaptEntityToResponseDTOForRead(data));
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
    
            const deleteTemplateUseCase = this.deleteTemplateUseCaseFactory.build();
            const result = await deleteTemplateUseCase.execute(filter);
    
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
            
            const updateTemplateUseCase = this.updateTemplateUseCaseFactory.build();
            const result = await updateTemplateUseCase.execute({template}, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
            res.end();
        }
    }
}