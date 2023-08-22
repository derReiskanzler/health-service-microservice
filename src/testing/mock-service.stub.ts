export class MockService {
    async findAll() {return new Promise(resolve => []);}
    async create() {return new Promise(resolve => ({}));}
    async delete() {return;}
}