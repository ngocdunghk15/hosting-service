import { createAsyncThunk } from '@reduxjs/toolkit';
import { servicesService } from '~/services/services.service.ts';
import { Service, ServiceHistory } from '~/types/service.type.ts';

interface PaginateOptions {
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any;
}

export interface LoadServiceResponse {
  data: Service[];
  paginationOptions: PaginateOptions;
}

export interface LoadServiceHistoriesResponse {
  data: ServiceHistory[];
  paginationOptions: PaginateOptions;
}

export const loadServices = createAsyncThunk<LoadServiceResponse>('services/load-services', async () => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { data, paginationOptions } = (await servicesService.getAll({ limit: 100 }))?.data;
  return {
    data,
    paginationOptions
  };
});

export const loadServiceHistories = createAsyncThunk<LoadServiceHistoriesResponse, string>(
  'services/load-services-history',
  async (id) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { data, paginationOptions } = (await servicesService.getHistories(id, { limit: 100 }))?.data;
    return {
      data: data,
      paginationOptions: paginationOptions
    };
  }
);

export const loadService = createAsyncThunk<Service, string>('services/load-service', async (id) => {
  return (await servicesService.getById(id))?.data;
});
