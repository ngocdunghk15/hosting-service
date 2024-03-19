import { createAsyncThunk } from '@reduxjs/toolkit';
import { servicesService } from '~/services/services.service.ts';
import { Service } from '~/types/service.type.ts';

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

export const loadServices = createAsyncThunk<LoadServiceResponse>('services/load-services', async () => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { data, paginationOptions } = (await servicesService.getAll())?.data;
  return {
    data,
    paginationOptions
  };
});
