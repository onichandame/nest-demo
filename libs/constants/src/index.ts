import { NestjsGraphql } from '@nest-libs/deps';

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
NestjsGraphql.registerEnumType(ROLE, { name: `ROLE` });

export enum JobStatus {
  ERROR = -1,
  PENDING = 0,
  FINISHED,
}
NestjsGraphql.registerEnumType(JobStatus, { name: `JobStatus` });

export enum JobType {
  CRON = 0,
  INTERVAL,
}
NestjsGraphql.registerEnumType(JobType, { name: `JobType` });
