import IFileService from '../../core/service/IFileService.js';
import { Readable, pipeline } from 'stream';
import fs from 'fs';
import ejs from 'ejs';
import { promisify } from 'util';
import { exec } from 'child_process';

export default class FileService extends IFileService {
    constructor({
    } = {}) {
        super();
        this.createHTMLFile = this.createHTMLFile.bind(this);
        this.createEjsFile = this.createEjsFile.bind(this);
    }

    async createEjsFile(fileGenerateConfig) {
        try {
            const promisedPipeline = promisify(pipeline);
            
            const fileDirPath = fileGenerateConfig.path;
    
            const readable = Readable({
                async read() {
                    this.push(fileGenerateConfig.template.templateVersions.at(0).content);
                    this.push(null);
                }
            });
    
            const filePath = `${fileDirPath}/${fileGenerateConfig.outputFileName}`;
            
            await promisedPipeline(
                readable,
                 fs.createWriteStream(`${filePath}.ejs`)
            );
        } catch (error) {
            console.log(error);
        }

        return fileGenerateConfig;
    }

    async createHTMLFile(fileGenerateConfig, data) {
        const promisedPipeline = promisify(pipeline);

        const fileDirPath = fileGenerateConfig.path;
        const filePath = `${fileDirPath}/${fileGenerateConfig.outputFileName}`;

        const readable = Readable({
            async read() {
                const buffer = await ejs.renderFile("./public/templates/defaultHTML.ejs", data);
                this.push(buffer);
                this.push(null);
            }
        });

        
        await promisedPipeline(
            readable,
            fs.createWriteStream(`${filePath}.html`)
        );

        const command = `npx postcss public/stylesheets/tailwind.css -o ./${fileDirPath}/style.css`;

        const promisedChildProcess = promisify(exec);
        await promisedChildProcess(command);

        return fileGenerateConfig;
    }

    async createTXTFile(fileGenerateConfig, data) {
        const promisedPipeline = promisify(pipeline);

        const fileDirPath = fileGenerateConfig.path;
        const filePath = `${fileDirPath}/${fileGenerateConfig.outputFileName}`;

        const readable = Readable({
            async read() {
                const buffer = await ejs.renderFile(`${filePath}${fileGenerateConfig.outputFileExtension}`, data);
                this.push(buffer);
                this.push(null);
            }
        });

        
        await promisedPipeline(
            readable,
            fs.createWriteStream(`${filePath}.txt`)
        );

        return fileGenerateConfig;
    }
    
}