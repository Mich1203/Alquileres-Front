import { IUser } from "./user.interface";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
