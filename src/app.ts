import express, { Express } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as middlewares from './middlewares';
import api from './api';
import { marked } from 'marked';

require('dotenv').config();

const app: Express = express();
const fs = require('fs');
const path = require('path');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const readmePath = path.join(__dirname, '../README.md');
    fs.readFile(readmePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error('Error reading README.md file:', err);
            return res.status(500).send('Error loading documentation.');
        }
        const htmlContent = marked(data);
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>API Documentation</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css">
                <style>
                    body {
                        box-sizing: border-box;
                        margin: 0 auto;
                        max-width: 800px;
                        padding: 2rem;
                    }
                </style>
            </head>
            <body class="markdown-body">
                ${htmlContent}
            </body>
            </html>
        `);
    });
});


app.use('/api/v1', api);
app.use('/api/v1/ollama', (req, res, next) => {
    const targetUrl = req.headers['x-localtunnel-url'];

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing X-LocalTunnel-Url header' });
    }

    const proxy = createProxyMiddleware({
        target: targetUrl as string,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api/v1/ollama': '' }
    });

    proxy(req, res, next);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;