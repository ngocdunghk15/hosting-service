import { Service } from '~/types/service.type.ts';
import { Status } from '~/enum/app.enum.ts';
import { createSlice } from '@reduxjs/toolkit';
import { loadServices } from '~/redux/actions/services.action.ts';

export interface ServicesSliceState {
  services: {
    data: Service[];
    status: Status;
  };
  currentService: {
    data: Service;
    status: Status;
  };
}

export const initialServicesState: ServicesSliceState = {
  services: {
    data: [],
    status: Status.IDLE
  },
  currentService: {
    data: {} as Service,
    status: Status.IDLE
  }
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState: initialServicesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadServices.pending, (state) => {
        state.services.status = Status.PENDING;
      })
      .addCase(loadServices.fulfilled, (state, action) => {
        state.services.data = action?.payload?.data;
        state.services.status = Status.FULFILLED;
      })
      .addCase(loadServices.rejected, (state) => {
        state.services.status = Status.REJECTED;
      });
  }
});
