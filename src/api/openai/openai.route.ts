import express from 'express';
import * as OpenAIPrompt from './openai.handlers';

const router = express.Router();

router.post('/', OpenAIPrompt.improvePromptOpenAI);

export default router;