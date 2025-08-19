"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionPlayerConfig = void 0;
const typeorm_1 = require("typeorm");
const session_players_1 = require("../../../domain/entity/session_players");
let SessionPlayerConfig = class SessionPlayerConfig extends typeorm_1.BaseEntity {
};
exports.SessionPlayerConfig = SessionPlayerConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SessionPlayerConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "userid" }),
    __metadata("design:type", Number)
], SessionPlayerConfig.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sessionid" }),
    __metadata("design:type", Number)
], SessionPlayerConfig.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pickednumber" }),
    __metadata("design:type", Number)
], SessionPlayerConfig.prototype, "pickedNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, name: "isowner" }),
    __metadata("design:type", Boolean)
], SessionPlayerConfig.prototype, "isOwner", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, name: "iswinner" }),
    __metadata("design:type", Boolean)
], SessionPlayerConfig.prototype, "isWinner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "joinedat" }),
    __metadata("design:type", Date)
], SessionPlayerConfig.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionPlayerConfig.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionPlayerConfig.prototype, "socketId", void 0);
exports.SessionPlayerConfig = SessionPlayerConfig = __decorate([
    (0, typeorm_1.Entity)("game_player")
], SessionPlayerConfig);
