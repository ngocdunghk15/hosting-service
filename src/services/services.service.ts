import { BuildAndDeployPayload, Service } from '~/types/service.type.ts';
import { httpService } from '~/services/http.service.ts';
import { LoadServiceHistoriesResponse, LoadServiceResponse } from '~/redux/actions/services.action.ts';

class ServicesService {
  public buildAndDeploy = async (payload: BuildAndDeployPayload) => {
    return await httpService.post('/core/deploy-project', payload);
  };

  public getAll = async () => {
    return await httpService.get<LoadServiceResponse>('/deployments');
  };

  public getById = async (id: string) => {
    return await httpService.get<Service>(`/deployments/${id}`);
  };

  public getHistories = async (id: string) => {
    return await httpService.get<LoadServiceHistoriesResponse>(`/deployments/${id}/histories`);
  };
}

export const servicesService = new ServicesService();
