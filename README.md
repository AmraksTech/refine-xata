# Xata Data Provider for Refine

This README provides detailed information about using the Xata data provider with Refine. This custom data provider enables seamless integration of Xata's database services with the Refine framework.

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

## Usage

You can now use the dataProvider with any Refine hooks that require data fetching, such as useList, useOne, useCreate, useUpdate, and useDelete. Below is an example of how to use useList to fetch data:

```typescript
import { useList } from '@refinedev/core';

const { data, isLoading, error } = useList({
  resource: 'campaigns',
  pagination: { current: 1, pageSize: 10 },
  filters: [{ field: 'status', operator: 'eq', value: 'active' }],
  sorters: [{ field: 'createdAt', order: 'desc' }],
});

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error! {error.message}</p>;

return (
  <div>
    {data.map((item) => (
      <div key={item.id}>
        <p>{item.name}</p>
      </div>
    ))}
  </div>
);
```
