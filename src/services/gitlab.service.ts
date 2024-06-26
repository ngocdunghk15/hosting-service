import { jwtService } from '~/services/jwt.service';
import { httpService } from '~/services/http.service';
import { GitlabAccountReturned, GitlabProjectReturned } from '~/types/gitlab.type.ts';

export interface GetAuthUrlOptions {
  client_id: string;
  redirect_uri: string;
  response_type?: string;
  state?: any;
  scope?: string;
  grant_type?: string;
}

interface ConnectPayload {
  code: string;
  redirect_uri: string;
}

export interface GetGitlabProjectByIdPayload {
  id: string;
}

export interface GetProjectHooksPayload {
  id: string;
}

class GitlabService {
  static END_POINT: string = 'https://gitlab.com';

  public getAuthorizationUrl(options: GetAuthUrlOptions): string {
    const url = new URL(GitlabService.END_POINT);
    url.pathname = '/oauth/authorize';
    url.searchParams.append('response_type', options?.response_type || 'code');
    url.searchParams.append('client_id', options?.client_id);
    url.searchParams.append('redirect_uri', options?.redirect_uri);

    if (options?.scope) {
      url.searchParams.append('scope', options?.scope);
    }

    if (options?.state) {
      url.searchParams.append('state', jwtService.encode(options?.state));
    }
    return url.toString();
  }

  public connect = async (payload: ConnectPayload) => {
    return await httpService.get('/gitlab/connect', payload);
  };

  public getAccountInfo = async () => {
    return await httpService.get<GitlabAccountReturned>('/gitlab/user-info');
  };

  public getAllProjects = async () => {
    return await httpService.get<GitlabProjectReturned>(`/gitlab/projects`);
  };

  public getProjectById = async (payload: GetGitlabProjectByIdPayload) => {
    return (await httpService.get<any>(`/gitlab/projects/${payload?.id}`))?.data?.data;
  };

  public getProjectHooks = async (payload: GetProjectHooksPayload) => {
    return (await httpService.get(`/gitlab/projects/${payload?.id}/hooks`));
  };
}

export const gitlabService = new GitlabService();
