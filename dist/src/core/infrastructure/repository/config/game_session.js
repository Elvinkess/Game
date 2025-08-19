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
exports.GameSessionConfig = void 0;
const typeorm_1 = require("typeorm");
const game_session_1 = require("../../../domain/dto/enums/game_session");
let GameSessionConfig = class GameSessionConfig extends typeorm_1.BaseEntity {
};
exports.GameSessionConfig = GameSessionConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GameSessionConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: game_session_1.SessionStatus, default: game_session_1.SessionStatus.PENDING }),
    __metadata("design:type", String)
], GameSessionConfig.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "maxplayers" }),
    __metadata("design:type", Number)
], GameSessionConfig.prototype, "maxPlayers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", name: "createdat", default: () => "now()" }),
    __metadata("design:type", Date)
], GameSessionConfig.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", name: "startedat", nullable: true }),
    __metadata("design:type", Object)
], GameSessionConfig.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", name: "endsat", nullable: true }),
    __metadata("design:type", Object)
], GameSessionConfig.prototype, "endsAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "winningnumber", nullable: true }),
    __metadata("design:type", Object)
], GameSessionConfig.prototype, "winningNumber", void 0);
exports.GameSessionConfig = GameSessionConfig = __decorate([
    (0, typeorm_1.Entity)("game_session")
], GameSessionConfig);
