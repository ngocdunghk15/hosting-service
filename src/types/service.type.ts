import { Account } from '~/types/account.type.ts';
import { Runtime, ServiceStatusEnum, ServiceType } from '~/enum/app.enum.ts';

export interface EnvironmentVariable {
  name: string;
  value: string;
}

export interface Service {
  name: string;
  projectId: string;
  projectBranch: string;
  runCommand: string[];
  env: EnvironmentVariable[];
  account: Account;
  registry: string;
  projectPath: string;
  servicePort: string;
  appPort: string;
  domain: string;
  entryPoint: string[];
  gitType: string;
  runtime: Runtime;
  status: ServiceStatusEnum;
  type: ServiceType;
}

export type CreateServicePayload = Pick<
  Service,
  'name' | 'projectId' | 'runCommand' | 'env' | 'appPort' | 'entryPoint' | 'projectBranch'
>;
