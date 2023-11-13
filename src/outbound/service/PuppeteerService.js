import fs from 'fs';

import IPuppeteerService from '../../core/service/IPuppeteerService.js';
import { pipeline } from 'stream';
import { promisify } from 'util';
import puppeteer from 'puppeteer';

export default class PuppeteerService extends IPuppeteerService {
    constructor() {
        super();
        this.createFile = this.createFile.bind(this);
    }

    async createFile(fileGenerateConfig) {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();

        const filePath = `${fileGenerateConfig.path}/${fileGenerateConfig.outputFileName}`;
        
        // Navigate the page to a URL
        await page.goto(`file://${process.cwd()}/${filePath}${fileGenerateConfig.outputFileExtension}`);

        const promisedPipeline = promisify(pipeline);

        await promisedPipeline(
            page.pdf(fileGenerateConfig.pdfOptions),
            fs.createWriteStream(`${filePath}.pdf`)
        );

        await browser.close();

        return fileGenerateConfig;
    }
    
}