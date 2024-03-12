import { httpService } from '~/services/http.service.ts';

interface DockerBuildPayload {
  projectId: string;
  runCommand: string[];
  env: string[];
  entrypoint: string[];
  port: string;
}

class BuildService {
  public dockerBuild = (payload: DockerBuildPayload) => {
    return httpService.post('/core/test', payload);
  };

  public test = () => {
    return httpService.post('/core/log');
  };
}

export const buildService = new BuildService();