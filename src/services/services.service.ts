import { BuildAndDeployPayload } from '~/types/service.type.ts';
import { httpService } from '~/services/http.service.ts';
import { LoadServiceResponse } from '~/redux/actions/services.action.ts';

class ServicesService {
  public buildAndDeploy = async (payload: BuildAndDeployPayload) => {
    return await httpService.post('/core/deploy-project', payload);
  };

  public getAll = async () => {
    return await httpService.get<LoadServiceResponse>('/deployments');
  };

  public getServiceHistories = async () => {};
}

export const servicesService = new ServicesService();
