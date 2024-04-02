"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaPrompt = void 0;
const z = __importStar(require("zod"));
const config_1 = require("../../../utils/config");
exports.OllamaPrompt = z.object({
    prompt: z.string(),
    model: z.string().optional().default(config_1.DEFAULT_OLLAMA_MODEL),
    temperature: z.number().optional().default(0.5),
    max_tokens: z.number().optional().default(100),
    top_p: z.number().optional().default(1),
    frequency_penalty: z.number().optional().default(0),
    presence_penalty: z.number().optional().default(0),
});
//# sourceMappingURL=ollama.model.js.map