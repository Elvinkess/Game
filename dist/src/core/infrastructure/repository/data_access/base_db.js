"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDb = void 0;
class BaseDb {
    constructor(myDataSource, entity) {
        this.get = (query) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findBy(query);
        });
        this.getOne = (query) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneBy(query);
        });
        this.create = (entity) => __awaiter(this, void 0, void 0, function* () {
            const savedentity = yield this.model.save(entity);
            return savedentity;
        });
        this.remove = (query) => __awaiter(this, void 0, void 0, function* () {
            const removeEnt = yield this.model.findBy(query);
            yield this.model.delete(query);
            return removeEnt[0];
        });
        this.update = (query, keyToUpdate) => __awaiter(this, void 0, void 0, function* () {
            yield this.model.update(query, keyToUpdate);
            return yield this.model.findOneBy(query);
        });
        this.model = myDataSource.getRepository(entity);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find();
        });
    }
}
exports.BaseDb = BaseDb;
