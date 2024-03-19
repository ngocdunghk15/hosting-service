import { Account } from '~/types/account.type.ts';
import { Runtime, ServiceStatusEnum, ServiceType } from '~/enum/app.enum.ts';

export interface EnvironmentVariable {
  name: string;
  value: string;
}

export interface Service {
  account: Account;
  name: string;
  projectPath: string;
  servicePort: string;
  appPort: string;
  domain: string;
  entryPoint: string[];
  env: EnvironmentVariable[];
  runCommand: string[];
  projectId: string;
  projectBranch: string;
  gitType: string;
  status: ServiceStatusEnum;
  runtime: Runtime;
  registry: string;
  dnsRecordId: string;
  gitlabHookId: string;
  githubHookId: string;
  type: ServiceType;
}

export type BuildAndDeployPayload = Pick<
  Service,
  'name' | 'projectId' | 'runCommand' | 'env' | 'appPort' | 'entryPoint' | 'projectBranch' | 'runtime'
>;
