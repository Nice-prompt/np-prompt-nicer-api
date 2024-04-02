import express from 'express';
import * as OpenAIPrompt from './ollama.handlers';

const router = express.Router();

router.post('/', OpenAIPrompt.improvePromptOllama);

export default router;