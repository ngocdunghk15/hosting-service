import { BuildAndDeployPayload } from '~/types/service.type.ts';
import { httpService } from '~/services/http.service.ts';
import {
  LoadServiceHistoriesResponse,
  LoadServiceResponse,
  LoadServicesResponse
} from '~/redux/actions/services.action.ts';

class ServicesService {
  public buildAndDeploy = async (payload: BuildAndDeployPayload) => {
    return await httpService.post('/core/deploy-project', payload);
  };

  public getAll = async (queries?: Record<string, string | number>) => {
    return await httpService.get<LoadServicesResponse>('/deployments', queries);
  };

  public getById = async (id: string) => {
    return await httpService.get<LoadServiceResponse>(`/deployments/${id}`);
  };

  public remove = async (id: string) => {
    return await httpService.delete(`/core/delete-deploy-project/${id}`);
  };

  public retry = async (id: string) => {
    return await httpService.get(`/core/${id}/retry`);
  };

  public getLogs = async (id: string) => {
    return await httpService.get(`/deployments/${id}/logs`, { limit: 1000, page: 1 });
  };

  public getHistories = async (id: string, queries?: Record<string, string | number>) => {
    return await httpService.get<LoadServiceHistoriesResponse>(`/deployments/${id}/histories`, queries);
  };
}

export const servicesService = new ServicesService();
