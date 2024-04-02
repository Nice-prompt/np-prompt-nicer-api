"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.improvePromptOpenAI = void 0;
const openai_1 = __importDefault(require("openai"));
const config_1 = require("../../../utils/config");
const openai_model_1 = require("./openai.model");
async function improvePromptOpenAI(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(400).send({ error: 'API key is required' });
    }
    const openai = new openai_1.default({
        apiKey: apiKey || "",
    });
    const validationResult = openai_model_1.OpenAIPrompt.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).send({
            error: 'Invalid request format',
            details: validationResult.error
        });
    }
    const { prompt, model, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, } = validationResult.data;
    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: config_1.DEFAULT_PROMPT,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model,
            temperature,
            max_tokens,
            top_p,
            frequency_penalty,
            presence_penalty,
        });
        res.json({ prompt: completion.choices[0].message.content });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}
exports.improvePromptOpenAI = improvePromptOpenAI;
//# sourceMappingURL=openai.handlers.js.map