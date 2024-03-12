import { Runtime, ServiceType, Status } from '~/enum/app.enum.ts';

export interface Service {
  _id: string;
  name: string;
  status: Status;
  type: ServiceType;
  runtime: Runtime;
  updatedAt: Date;
}