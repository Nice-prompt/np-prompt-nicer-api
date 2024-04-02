import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import { DEFAULT_PROMPT } from "../../../utils/config"
import { OpenAIPrompt } from "./openai.model";

export async function improvePromptOpenAI(req: Request<OpenAIPrompt>, res: Response, next: NextFunction) {
   
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
        return res.status(400).send({ error: 'API key is required' });
    }

    const openai = new OpenAI({
        apiKey: apiKey || "",
    });

    const validationResult = OpenAIPrompt.safeParse(req.body);

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


    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: DEFAULT_PROMPT,
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
    } catch (err) {
        console.log(err);
        next(err);
    }
}