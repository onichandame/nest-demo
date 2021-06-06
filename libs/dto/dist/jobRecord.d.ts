import { JobRecord, Id, StripDocumentProperties } from "@kesci/model";
import { JobStatus } from "@kesci/constants";
import { JobDTO } from "./job";
export declare class JobRecordDTO implements StripDocumentProperties<JobRecord> {
    _id: Id;
    job: JobDTO;
    status: JobStatus;
    Deleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}
