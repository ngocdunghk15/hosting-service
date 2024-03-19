import { Service, ServiceHistory } from '~/types/service.type.ts';
import { Status } from '~/enum/app.enum.ts';
import { createSlice } from '@reduxjs/toolkit';
import { loadService, loadServiceHistories, loadServices } from '~/redux/actions/services.action.ts';

export interface ServicesSliceState {
  services: {
    data: Service[];
    status: Status;
  };
  currentService: {
    data: Service;
    status: Status;
    histories: {
      data: ServiceHistory[];
      status: Status;
    };
  };
}

export const initialServicesState: ServicesSliceState = {
  services: {
    data: [],
    status: Status.IDLE
  },
  currentService: {
    data: {} as Service,
    status: Status.IDLE,
    histories: {
      data: [],
      status: Status.IDLE
    }
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
    builder
      .addCase(loadServiceHistories.pending, (state) => {
        state.currentService.histories.status = Status.PENDING;
      })
      .addCase(loadServiceHistories.fulfilled, (state, action) => {
        state.currentService.histories.data = action?.payload?.data;
        state.currentService.histories.status = Status.FULFILLED;
      })
      .addCase(loadServiceHistories.rejected, (state) => {
        state.currentService.histories.status = Status.REJECTED;
      });

    builder
      .addCase(loadService.pending, (state) => {
        state.currentService.status = Status.PENDING;
      })
      .addCase(loadService.fulfilled, (state, action) => {
        state.currentService.data = action?.payload;
        state.currentService.status = Status.FULFILLED;
      })
      .addCase(loadService.rejected, (state) => {
        state.currentService.status = Status.REJECTED;
      });
  }
});
