# Dashboard Node.js SDK

Node.js library for the Dashboard API

## Install

```bash
npm install @triargos/dashboard-node
# or
yarn add @triargos/dashboard-node
```

## Setup

First, you need to obtain an API key from the integrations page in the Dashboard.

```ts
import {Dashboard} from "@triargos/dashboard-node";

const dashboard = new Dashboard({apiKey: "db_1234", environment: "staging"})
```

You can specify a set of environments

- `production` (default): Queries the production API endpoint
- `staging`: Queries the staging API endpoint
- `development`: Queries the development API endpoint (http://localhost:3000)

## Usage

#### Listing organizations

> [!CAUTION]
> You can only list organizations that have your integration installed.

```ts
const organizations = await dashboard.organizations.findAll()
```

After listing organizations, you can take the organization id to perform additional operations

#### Listing members

```ts
const members = await dashboard.organizations.members.findAll('org_id')
```

## Errors

Internally, the client uses ZOD to validate the API responses. If the API returns an unexpected response, the client
will throw an error.
Errors thrown by the API extend the `ApiException` class, which includes the following properties:

- `status`: The HTTP status code of the response.
- `message`: The error message returned by the API.

Otherwise, the client throws the following custom errors to help you differentiate between different types of errors:

- `MissingAuthenticationException`: You didn't provide an API key or the API key is invalid.
- `ResourceForbiddenException`: You don't have permission to access the resource.
- `ResourceNotFoundException`: The requested resource doesn't exist.
- `InternalServerException`: An unexpected error occurred on the server.
- `UnknownApiException`: An unknown error occurred, but was thrown in the API call.
- `UnknownException`: An unknown error occurred that was not thrown in the API call.

> [!TIP]
> You can find the whole API documentation [here](https://dashboard-docs.triargos.de/)

## License

MIT License