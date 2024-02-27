export interface GitlabAccount {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
}

export interface GitlabAccountReturned {
  data: {
    account: GitlabAccount;
  };
  success: boolean;
}

export interface GitlabProjectReturned {
  data: {
    projects: GitlabProject[];
  };
  success: boolean;
}

export interface GitlabProject {
  id: number;
  name: string;
  path: string;
  path_with_namespace: string;
  default_branch: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  avatar_url: any;
  empty_repo: boolean;
  archived: boolean;
  visibility: string;
  last_activity_at: Date;
  namespace: GitlabNamespace;
  owner: GitlabAccount;
}

export interface GitlabNamespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id: any;
  avatar_url: any;
  web_url: string;
}
