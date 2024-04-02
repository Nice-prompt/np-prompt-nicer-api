import express from 'express';
import openaiGenerate from './openai/openai.route';
import ollamaGenerate from './ollama/ollama.route';
const router = express.Router();

router.use('/openai', openaiGenerate);
router.use('/ollama', ollamaGenerate);


export default router;
