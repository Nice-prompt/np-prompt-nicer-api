import * as z from 'zod';
import { DEFAULT_OLLAMA_MODEL } from '../../../utils/config';

export const OllamaPrompt = z.object({
    prompt: z.string(),
    model: z.string().optional().default(DEFAULT_OLLAMA_MODEL),
    temperature: z.number().optional().default(0.5),
    max_tokens: z.number().optional().default(100),
    top_p: z.number().optional().default(1),
    frequency_penalty: z.number().optional().default(0),
    presence_penalty: z.number().optional().default(0),
});


export type OllamaPrompt = z.infer<typeof OllamaPrompt>;