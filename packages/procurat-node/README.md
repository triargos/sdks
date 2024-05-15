
# Procurat Node.js SDK

Node.js library for the Procurat API

## Installation

```bash
npm install @triargos/procurat-node
# or
yarn add @triargos/procurat-node
```

## Setup

First, you need to obtain an API key from the Settings page in your Procurat Application

```ts
import {Procurat} from "@triargos/procurat-node";

const procurat = new Procurat(apiKey, baseUrl)
```

MIT License