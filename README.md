# Xata Data Provider for Refine

This custom data provider enables seamless integration of Xata's database services with the Refine framework.

(IN PROGRESS ...)

## Prerequisites

Before using this data provider, ensure you have:

- An account with Xata
- A configured Xata project with a database
- The Xata SDK installed in your project

## Installation

Make sure you have `@refinedev/core` and `@xata.io/client` installed in your project. If not, you can install them using npm:

```bash
npm install @refinedev/core @xata.io/client
```

## Setup

Import and initialize the Xata client, then pass it to the data provider:

```typescript
import { getXataClient } from './xata'; // Adjust the path as necessary
import { dataProvider as createDataProvider } from './path/to/dataProvider'; // Adjust the path as necessary

const xataClient = getXataClient();
const dataProvider = createDataProvider(xataClient);
```
