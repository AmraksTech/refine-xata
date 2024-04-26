import { DataProvider, type BaseRecord, CrudFilters } from '@refinedev/core';
import { type BaseClient, type XataRecord } from '@xata.io/client';
import { handleError } from '../utils'; // Ensure you have a suitable error handler

export const dataProvider = (xata: BaseClient): DataProvider => {
  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      try {
        const { current = 1, pageSize = 10 } = pagination ?? {};

        const page = await xata.db[resource]
          .select(meta?.select || '*')
          .getPaginated({
            pagination: {
              size: pageSize,
            },
          });

        return {
          data: page.records || [],
          total: page.records.length || 0,
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    getMany: async ({ resource, ids, meta }) => {
      try {
        const records = await Promise.all(
          ids.map((id) => xata.db[resource].read(String(id)))
        );
        return {
          data: records,
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    getOne: async ({ resource, id, meta }) => {
      try {
        const record = await xata.db[resource].read(String(id));
        return {
          data: record,
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    create: async ({ resource, variables, meta }) => {
      try {
        const record = await xata.db[resource].create(variables as XataRecord);
        return {
          data: record,
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    update: async ({ resource, id, variables, meta }) => {
      try {
        const record = await xata.db[resource].update(
          String(id),
          variables as XataRecord
        );
        return {
          data: record,
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    deleteOne: async ({ resource, id, meta }) => {
      try {
        await xata.db[resource].delete(String(id));
        return {
          data: { id },
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    deleteMany: async ({ resource, ids, meta }) => {
      try {
        const responses = await Promise.all(
          ids.map((id) => xata.db[resource].delete(String(id)))
        );
        return {
          data: responses.map((_, index) => ({ id: ids[index] })),
        } as any;
      } catch (error) {
        return handleError(error);
      }
    },

    getApiUrl: () => {
      throw new Error(
        'getApiUrl method is not applicable for Xata data provider.'
      );
    },

    custom: () => {
      throw new Error(
        'Custom method is not implemented in this Xata data provider.'
      );
    },
  };
};
