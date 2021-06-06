import { JobType } from "@kesci/constants";
import { Job, StripDocumentProperties } from "@kesci/model";
import { JobRecordDTO } from "./jobRecord";
export declare class JobDTO implements StripDocumentProperties<Job> {
    name: string;
    type: JobType;
    records?: JobRecordDTO[];
    Deleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}
