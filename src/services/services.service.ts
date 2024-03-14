import { CreateServicePayload } from '~/types/service.type.ts';
import { httpService } from '~/services/http.service.ts';

class ServicesService {
  public create = async (payload: CreateServicePayload) => {
    return await httpService.post('/services', payload);
  };
}

export const servicesService = new ServicesService();
