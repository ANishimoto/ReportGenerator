import fs from 'fs';
import { randomUUID } from 'crypto';
import AbstractController from "./AbstractController.js";
import FileGenerateConfigDTO from "../dto/request/FileGenerateConfigDTO.js";
import FileGenerateConfigMapper from "../dto/mapper/FileGenerateConfigMapper.js";
import PuppeteerService from '../../../outbound/service/PuppeteerService.js';
import TemplateService from "../../../outbound/service/TemplateService.js";
import FileService from '../../../outbound/service/FileService.js';
import GeneratePdfFileUseCaseFactory from '../../../core/useCaseFactory/reportGenerate/GeneratePdfFileUseCaseFactory.js';
import GenerateTextFileUseCaseFactory from '../../../core/useCaseFactory/reportGenerate/GenerateTextFileUseCaseFactory.js';
import GenerateHtmlFileUseCaseFactory from '../../../core/useCaseFactory/reportGenerate/GenerateHtmlFileUseCaseFactory.js';
import GenerateCsvFileUseCaseFactory from '../../../core/useCaseFactory/reportGenerate/GenerateCsvFileUseCaseFactory.js';

export default class FileGenerateController extends AbstractController {
    constructor() {
        super();
        this.generateTextFile = this.generateTextFile.bind(this);  
        this.generatePdfFile = this.generatePdfFile.bind(this);  
        this.fileGenerateConfigMapper = new FileGenerateConfigMapper();
        this.templateService = TemplateService;
        this.fileService = FileService;
        this.puppeteerService = PuppeteerService;
        this.generateTextFileUseCase = new GenerateTextFileUseCaseFactory({
            templateService: this.templateService,
            fileService: this.fileService,
        });
        this.generateCsvFileUseCase = new GenerateCsvFileUseCaseFactory({
            templateService: this.templateService,
            fileService: this.fileService,
        });
        this.generateHtmlFileUseCaseFactory = new GenerateHtmlFileUseCaseFactory({
            templateService: this.templateService,
            fileService: this.fileService,
        });
        this.generatePdfFileUseCaseFactory = new GeneratePdfFileUseCaseFactory({
            templateService: this.templateService,
            fileService: this.fileService,
            puppeteerService: this.puppeteerService,
        });
    }

    async generateTextFile(req, res) {
        try {
            if (!fs.existsSync(process.env.TEMP_UPLOAD_DIR)) {
                fs.mkdirSync(process.env.TEMP_UPLOAD_DIR);
            }
            const fileGenerateConfigDTO = new FileGenerateConfigDTO({...req.body, ...req.file});
            const fileGenerateConfig = this.fileGenerateConfigMapper.adaptRequestDTOToEntity(fileGenerateConfigDTO);

            const generateTextFileUseCase = this.generateTextFileUseCaseFactory.build();
            const result = await generateTextFileUseCase.execute({fileGenerateConfig});
    
            if (fs.existsSync(req.file.path)) {
                fs.rmSync(req.file.path);
            }

            res.status(result.status);
            if(result.status != 201) {
                res.send(result);
            } else {
                if (fs.existsSync(result.data.filePath)) {
                    res.attachment(result.data.fileName);
                    fs.createReadStream(result.data.filePath).pipe(res).on('close', () => {
                        fs.rmSync(result.data.filePath);
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.end();
        }
    }

    async generateCsvFile(req, res) {
        try {
            if (!fs.existsSync(process.env.TEMP_UPLOAD_DIR)) {
                fs.mkdirSync(process.env.TEMP_UPLOAD_DIR);
            }
            const fileGenerateConfigDTO = new FileGenerateConfigDTO({...req.body, ...req.file});
            const fileGenerateConfig = this.fileGenerateConfigMapper.adaptRequestDTOToEntity(fileGenerateConfigDTO);

            const generateCsvFileUseCase = this.generateCsvFileUseCaseFactory.build();
            const result = await generateCsvFileUseCase.execute({fileGenerateConfig});
    
            if (fs.existsSync(req.file.path)) {
                fs.rmSync(req.file.path);
            }

            res.status(result.status);
            if(result.status != 201) {
                res.send(result);
            } else {
                if (fs.existsSync(result.data.filePath)) {
                    res.attachment(result.data.fileName);
                    fs.createReadStream(result.data.filePath).pipe(res).on('close', () => {
                        fs.rmSync(result.data.filePath);
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.end();
        }
    }

    async generatePdfFile(req, res) {
        try {
            if (!fs.existsSync(process.env.TEMP_UPLOAD_DIR)) {
                fs.mkdirSync(process.env.TEMP_UPLOAD_DIR);
            }
            const fileGenerateConfigDTO = new FileGenerateConfigDTO({...req.body, ...req.file});
            const fileGenerateConfig = this.fileGenerateConfigMapper.adaptRequestDTOToEntity(fileGenerateConfigDTO);
            const newPath = `${process.env.TEMP_UPLOAD_DIR}/${randomUUID()}`;

            if (fs.existsSync(fileGenerateConfig.path)) {
                fs.mkdirSync(newPath);
                fs.rename(fileGenerateConfig.path, `${newPath}/${fileGenerateConfig.fileName}`, (err) => {
                    if (err) {
                      console.error(`Erro ao mover o arquivo: ${err}`);
                    }
                });
                fileGenerateConfig.path = newPath;
            }

            const generatePdfFileUseCase = this.generatePdfFileUseCaseFactory.build();
            const result = await generatePdfFileUseCase.execute({fileGenerateConfig});

            res.status(result.status);
            if(result.status != 201) {
                res.send(result);
            } else {
                if (fs.existsSync(result.data.entity.path)) {
                    res.attachment(`${result.data.entity.outputFileName}${result.data.entity.outputFileExtension}`);
                    result.data.stream.pipe(res).on('close', () => {
                        fs.rmSync(result.data.entity.path, {recursive: true});
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.end();
        }
    }

    async generateHtmlFile(req, res) {
        try {
            if (!fs.existsSync(process.env.TEMP_UPLOAD_DIR)) {
                fs.mkdirSync(process.env.TEMP_UPLOAD_DIR);
            }
            const fileGenerateConfigDTO = new FileGenerateConfigDTO({...req.body, ...req.file});
            const fileGenerateConfig = this.fileGenerateConfigMapper.adaptRequestDTOToEntity(fileGenerateConfigDTO);
            const newPath = `${process.env.TEMP_UPLOAD_DIR}/${randomUUID()}`;

            if (fs.existsSync(fileGenerateConfig.path)) {
                fs.mkdirSync(newPath);
                fs.rename(fileGenerateConfig.path, `${newPath}/${fileGenerateConfig.fileName}`, (err) => {
                    if (err) {
                      console.error(`Erro ao mover o arquivo: ${err}`);
                    }
                });
                fileGenerateConfig.path = newPath;
            }

            const generateHtmlFileUseCase = this.generateHtmlFileUseCaseFactory.build();
            const result = await generateHtmlFileUseCase.execute({fileGenerateConfig});

            res.status(result.status);
            if(result.status != 201) {
                res.send(result);
            } else {
                if (fs.existsSync(result.data.entity.path)) {
                    res.attachment(`${result.data.entity.outputFileName}${result.data.entity.outputFileExtension}`);
                    result.data.stream.pipe(res).on('close', () => {
                        fs.rmSync(result.data.entity.path, {recursive: true});
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.end();
        }
    }
}