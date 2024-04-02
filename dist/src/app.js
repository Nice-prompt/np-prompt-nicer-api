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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const middlewares = __importStar(require("./middlewares"));
const api_1 = __importDefault(require("./api"));
const marked_1 = require("marked");
require('dotenv').config();
const app = (0, express_1.default)();
const fs = require('fs');
const path = require('path');
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    const readmePath = path.join(__dirname, '../README.md');
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading README.md file:', err);
            return res.status(500).send('Error loading documentation.');
        }
        const htmlContent = (0, marked_1.marked)(data);
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
app.use('/api/v1', api_1.default);
app.use('/api/v1/ollama', (req, res, next) => {
    const targetUrl = req.headers['x-localtunnel-url'];
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing X-LocalTunnel-Url header' });
    }
    const proxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: targetUrl,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api/v1/ollama': '' }
    });
    proxy(req, res, next);
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map