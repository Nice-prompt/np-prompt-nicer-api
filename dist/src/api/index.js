"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_route_1 = __importDefault(require("./openai/openai.route"));
const ollama_route_1 = __importDefault(require("./ollama/ollama.route"));
const router = express_1.default.Router();
router.use('/openai', openai_route_1.default);
router.use('/ollama', ollama_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map