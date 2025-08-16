"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./src/api/routes/user_route"));
const auth_middleware_1 = require("./src/api/middlewares/auth_middleware");
const auth_service_1 = require("./src/core/infrastructure/service/auth_service");
const app = (0, express_1.default)();
const port = process.env.port;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let auth = new auth_service_1.AuthService();
let authmiddleware = new auth_middleware_1.AuthMiddleware(auth);
app.use("/user", user_route_1.default);
app.get('/', authmiddleware.authenticateJWT, (req, res) => {
    res.send('Congrats you just passed the Auth middleware test');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
