import { Request, Response, NextFunction } from "express";
import { DEFAULT_PROMPT } from "../../../utils/config";
import { OllamaPrompt } from "../ollama/ollama.model";

export async function improvePromptOllama(req: Request<OllamaPrompt>, res: Response, next: NextFunction) {
    try {

        const localtunnelUrl = req.headers['x-localtunnel-url'] as string;

        if (!localtunnelUrl) {
            return res.status(400).json({ error: 'Missing X-LocalTunnel-Url header' });
        }

        const validationResult = OllamaPrompt.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).send({
                error: 'Invalid request format',
                details: validationResult.error
            });
        }

        const {
            prompt,
            model,
            temperature,
            max_tokens,
            top_p,
            frequency_penalty,
            presence_penalty,
        } = validationResult.data;


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
                    content: DEFAULT_PROMPT
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
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}
