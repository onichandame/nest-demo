import { registerEnumType } from '@nestjs/graphql';

export const XUserHeader = `x-user-id`;

export const jwtToken = `f8fd9c8d-f4ce-43ed-9c29-9743a598591d`;

export enum ROLE {
  // 其他
  DALIT = -1,
  // 访客
  GUEST = 0,
  // 普通用户
  SHUDRA,
  // 高级用户
  VAISHYA,
  // 次管
  KSHATRIYA,
  // 超管
  BRAHMIN,
}
registerEnumType(ROLE, { name: `ROLE` });

export enum JobStatus {
  ERROR = -1,
  PENDING = 0,
  FINISHED,
}
registerEnumType(JobStatus, { name: `JobStatus` });

export enum JobType {
  CRON = 0,
  INTERVAL,
}
registerEnumType(JobType, { name: `JobType` });
