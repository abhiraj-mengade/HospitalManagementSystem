import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const treatmentSchema= require('../schemas/investigation');
const remote = window.require("electron").remote;

class InvestigationStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(treatmentSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/investigation.db");
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    async validate(data) {
        return await this.schemaValidator(data);
    }

    async create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return await this.db.insert(data);
        }
    }

    async read(_id) {
        return await this.db.findOne({_id}).exec()
    }

    async readAll() {
        return await this.db.find()
    }

    async update(id, data){
        const isValid = this.validate(data);
        if(isValid){
            return await this.db.update({id: id}, data);
        }
    }

    async delete(id){
        return await this.db.remove({id: id});
    }

    async getReports(id){
        return await this.db.find({prescription: id});
    }

}

export default new InvestigationStore();
