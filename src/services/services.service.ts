import { BuildAndDeployPayload, Service } from '~/types/service.type.ts';
import { httpService } from '~/services/http.service.ts';
import { LoadServiceHistoriesResponse, LoadServiceResponse } from '~/redux/actions/services.action.ts';

class ServicesService {
  public buildAndDeploy = async (payload: BuildAndDeployPayload) => {
    return await httpService.post('/core/deploy-project', payload);
  };

  public getAll = async (queries?: Record<string, string | number>) => {
    return await httpService.get<LoadServiceResponse>('/deployments', queries);
  };

  public getById = async (id: string) => {
    return await httpService.get<Service>(`/deployments/${id}`);
  };

  public remove = async (id: string) => {
    return await httpService.delete(`/core/delete-deploy-project/${id}`);
  };

  public getHistories = async (id: string, queries?: Record<string, string | number>) => {
    return await httpService.get<LoadServiceHistoriesResponse>(`/deployments/${id}/histories`, queries);
  };
}

export const servicesService = new ServicesService();
