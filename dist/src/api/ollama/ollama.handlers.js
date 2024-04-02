"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.improvePromptOllama = void 0;
const config_1 = require("../../../utils/config");
const ollama_model_1 = require("../ollama/ollama.model");
async function improvePromptOllama(req, res, next) {
    try {
        const localtunnelUrl = req.headers['x-localtunnel-url'];
        if (!localtunnelUrl) {
            return res.status(400).json({ error: 'Missing X-LocalTunnel-Url header' });
        }
        const validationResult = ollama_model_1.OllamaPrompt.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).send({
                error: 'Invalid request format',
                details: validationResult.error
            });
        }
        const { prompt, model, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, } = validationResult.data;
        if (!prompt || prompt === '' || prompt === ' ') {
            return res.status(400).send({ error: 'Prompt is required' });
        }
        console.log('Prompt:', req.body);
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [{
                        role: "assistant",
                        content: config_1.DEFAULT_PROMPT
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature,
                max_tokens,
                top_p,
                frequency_penalty,
                presence_penalty,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        let messages = data.split('\n').filter(Boolean);
        let updatedPrompt = '';
        for (const message of messages) {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.message.role === 'assistant') {
                updatedPrompt += parsedMessage.message.content;
            }
        }
        res.json({ prompt: updatedPrompt });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}
exports.improvePromptOllama = improvePromptOllama;
//# sourceMappingURL=ollama.handlers.js.map