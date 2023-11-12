import AbstractController from "./AbstractController.js";
import TemplateTypeDTO from "../dto/request/TemplateTypeDTO.js";
import TemplateTypeFilter from "../filter/TemplateTypeFilter.js";
import TemplateTypeFilterMapper from "../filter/mapper/TemplateTypeFilterMapper.js";
import TemplateTypeMapper from "../dto/mapper/TemplateTypeMapper.js";
import TemplateTypeRepository from "../../../outbound/database/orm/sequelize/repository/TemplateTypeRepository.js";
import TemplateTypeService from "../../../outbound/service/TemplateTypeService.js";
import CreateTemplateTypeUseCaseFactory from "../../../core/useCaseFactory/templateType/CreateTemplateTypeUseCaseFactory.js";
import FindAllTemplateTypesUseCaseFactory from "../../../core/useCaseFactory/templateType/FindAllTemplateTypesUseCaseFactory.js";
import FindOneTemplateTypeUseCaseFactory from "../../../core/useCaseFactory/templateType/FindOneTemplateTypeUseCaseFactory.js";
import DeleteTemplateTypeUseCaseFactory from "../../../core/useCaseFactory/templateType/DeleteTemplateTypeUseCaseFactory.js";
import UpdateTemplateTypeUseCaseFactory from "../../../core/useCaseFactory/templateType/UpdateTemplateTypeUseCaseFactory.js";

export default class TemplateTypeTypeController extends AbstractController {
    constructor() {
        super();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.templateTypeMapper = new TemplateTypeMapper();
        this.templateTypeFilterMapper = new TemplateTypeFilterMapper();
        this.templateTypeRepository = TemplateTypeRepository;
        this.templateTypeService = TemplateTypeService;
        
        this.createTemplateTypeUseCaseFactory = new CreateTemplateTypeUseCaseFactory({
            templateTypeService: this.templateTypeService,
            templateTypeRepository: this.templateTypeRepository,
        });
        
        this.findAllTemplateTypesUseCaseFactory = new FindAllTemplateTypesUseCaseFactory({
            templateTypeService: this.templateTypeService,
            templateTypeRepository: this.templateTypeRepository,
        });
        
        this.findOneTemplateTypeUseCaseFactory = new FindOneTemplateTypeUseCaseFactory({
            templateTypeService: this.templateTypeService,
            templateTypeRepository: this.templateTypeRepository,
        });
        
        this.deleteTemplateTypeUseCaseFactory = new DeleteTemplateTypeUseCaseFactory({
            templateTypeService: this.templateTypeService,
            templateTypeRepository: this.templateTypeRepository,
        });
        
        this.updateTemplateTypeUseCaseFactory = new UpdateTemplateTypeUseCaseFactory({
            templateTypeService: this.templateTypeService,
            templateTypeRepository: this.templateTypeRepository,
        });
    }

    async create(req, res) {
        try {
            const templateTypeDTO = new TemplateTypeDTO(req.body);
            const templateType = this.templateTypeMapper.adaptRequestDTOToEntity(templateTypeDTO);
            
            const createTemplateTypeUseCase = this.createTemplateTypeUseCaseFactory.build();
            const result = await createTemplateTypeUseCase.execute({templateType});
    
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

            const findAllTemplateTypesUseCase = this.findAllTemplateTypesUseCaseFactory.build();
            const result = await findAllTemplateTypesUseCase.execute(filter);
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

            const findOneTemplateTypeUseCase = this.findOneTemplateTypeUseCaseFactory.build();
            const result = await findOneTemplateTypeUseCase.execute(filter);
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

            const deleteTemplateTypeUseCase = this.deleteTemplateTypeUseCaseFactory.build();
            const result = await deleteTemplateTypeUseCase.execute(filter);
    
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
            
            const updateTemplateTypeUseCase = this.updateTemplateTypeUseCaseFactory.build();
            const result = await updateTemplateTypeUseCase.execute({templateType}, filter);
            
            result.data = '';
            res.status(result.status);
            res.send(result);
        } catch (error) {
            res.status(500);
        }
        res.end();
    }
}