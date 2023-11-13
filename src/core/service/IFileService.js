export default class IFileService {
    constructor () {
        if (!this.createEjsFile) throw new Error(`Method createEjsFile not implemented in ${this.constructor.name}!`);
        if (!this.createHTMLFile) throw new Error(`Method createHTMLFile not implemented in ${this.constructor.name}!`);
        if (!this.createTXTFile) throw new Error(`Method createTXTFile not implemented in ${this.constructor.name}!`);
        if (!this.createCSVFile) throw new Error(`Method createCSVFile not implemented in ${this.constructor.name}!`);
    }
}