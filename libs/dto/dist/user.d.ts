import { ROLE } from "@kesci/constants";
import { StripAutoFields, Id, User, StripDocumentProperties } from "@kesci/model";
export declare class UserDTO implements StripDocumentProperties<User> {
    _id: Id;
    CreatedAt: Date;
    UpdatedAt: Date;
    Deleted: boolean;
    name: string;
    email?: string;
    roles: ROLE[];
}
export declare class UserCreateDTO implements StripAutoFields<UserDTO> {
    name: string;
    email?: string;
    roles: ROLE[];
}
export declare class UserUpdateDTO implements Partial<StripAutoFields<UserDTO>> {
    name?: string;
    email?: string;
}
