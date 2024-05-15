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
const organizations = await dashboard.organizations.getOrganizations()
```

After listing organizations, you can take the organization id to perform additional operations

#### Listing members

```ts
const members = await dashboard.persons.getPersons({organizationId: "org_1234"})
```

> [!TIP]
> You can find the whole API documentation [here](https://dashboard-docs.triargos.de/)

## License

MIT License