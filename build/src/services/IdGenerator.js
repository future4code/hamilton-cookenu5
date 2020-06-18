"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
const uuid_1 = require("uuid");
class IdGenerator {
    idGenerator() {
        const id = uuid_1.v4();
        return id;
    }
}
exports.IdGenerator = IdGenerator;
