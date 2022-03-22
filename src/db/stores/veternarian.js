const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const veternarianSchema= require('../schemas/veternarian');

class VeternarianStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(veternarianSchema);
        const dbPath = `${process.cwd()}/veternarian.db`;
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
    async getVeterinarian(id){
        const vet = await this.read(id);
        if(!vet){
            return null;
        }
        return vet;

}
}
module.exports = new VeternarianStore();
