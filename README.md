# Nice Prompt REST API

Nice prompt is a REST API offers an intuitive way for developers and users to enhance their prompts using advanced language models. This API supports both OpenAI and Ollama, providing versatile options for generating and improving prompt responses.


https://github.com/Nice-prompt/nice-prompt-api/assets/43992376/fb5c7d41-7776-4c12-aabd-ba7b3325b740

## Features

- Generate dynamic responses with OpenAI's language models.
- Utilize Ollama for improving your prompts locally.
- Easy-to-use API endpoints tailored for prompt generation and improvement.

## Getting Started

Begin by obtaining an API key from OpenAI or if you want to use Ollama, setting up your local Ollama server following the Ollama documentation.

### Prerequisites

- An OpenAI API key, available through OpenAI.
- Local Ollama server setup for those preferring or requiring local computations.

## Using the API

There are two primary endpoints for interaction:

| Endpoint | Description |
| -------- | ----------- |
| `/api/v1/openai` | For generating content with OpenAI. |
| `/api/v1/ollama` | For generating content with local Ollama server. |

### OpenAI

Send a POST request to `/api/v1/openai` with the following JSON payload and api key in headers as "x-api-key":

| Parameter | Required | Default | Description |
| --------- | -------- | ------- | ----------- |
| `prompt` | Yes | N/A | The prompt you want to generate a response for. |
| `model` | No | `gpt-3.5-turbo` | The model to use for generation. |
| `temperature` | No | `0.7` | Controls the randomness of the output. |
| `max_tokens` | No | `150` | The maximum length of the output. |
| `top_p` | No | `1` | Controls the diversity of the output. |
| `frequency_penalty` | No | `0` | Penalizes frequently used tokens. |
| `presence_penalty` | No | `0` | Penalizes new tokens. |
| `x-api-key` | Yes | N/A | Your OpenAI API key, in headers. |


```json
{
  "prompt": "How to learn code?", // Required
  "model" : "gpt-3.5-turbo",  // Default
  "temperature": 0.7,
  "max_tokens": 150,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
}
```

Here is response;

```json
{
    "prompt": "What are the most effective strategies and resources for beginners to learn coding, especially for someone with no prior programming experience?"
}
```

### Local LLMS with Ollama

For the Nice Prompt API to communicate with your local Ollama server, you can use `localtunnel` to expose your local server. Here's how to set it up:

1. Install `localtunnel` globally on your machine:

```bash
npm install -g localtunnel
```

Start your local Ollama server on the default port (or configure it as needed).

Use localtunnel to expose your local server:

```bash
lt --port 11434
```

This command will generate a publicly accessible URL (e.g., <https://yoursubdomain.loca.lt>) that proxies all requests to your local Ollama server.

When using the Nice Prompt API /api/v1/ollama endpoint, include the generated localtunnel URL in the request header as X-LocalTunnel-Url.

This setup allows your API to direct requests to your local Ollama server through the localtunnel URL.


Ensure your local Ollama server is running and exposed via localtunnel. Then, send a POST request to /api/v1/ollama with the following JSON payload and your localtunnel URL in the X-LocalTunnel-Url header:

| Parameter | Required | Default | Description |
| --------- | -------- | ------- | ----------- |
| `prompt` | Yes | N/A | The prompt you want to generate a response for. |
| `model` | No | `llama2` | The model to use for generation. |
| `temperature` | No | `0.5` | Controls the randomness of the output. |
| `max_tokens` | No | `100` | The maximum length of the output. |
| `top_p` | No | `1` | Controls the diversity of the output. |
| `frequency_penalty` | No | `0` | Penalizes frequently used tokens. |
| `presence_penalty` | No | `0` | Penalizes new tokens. |

```json
{
  "prompt": "How to learn code?", // Required
  "model": "llama2", // Default
  "temperature": 0.5,
  "max_tokens": 100,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}
```

Here is response;

```json
{
    "prompt": "How do I effectively learn programming languages \n and develop practical coding skills to tackle real-world problems and projects? What are the best resources, strategies, and practices for acquiring knowledge and proficiency in software development?"
}
```

Note: The Ollama server must be started locally for this endpoint to function. Follow the setup instructions in the [Ollama documentation](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion).


