import { UserRole } from "@common/constant";

export interface IUserJwt {
    id: string;
    email: string;
    role: UserRole

}