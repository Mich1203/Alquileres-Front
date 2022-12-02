import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ApiResponse } from "../interfaces/general.interface";
import { IUser } from "../interfaces/user.interface";
import axios from "./axios";

const registerFn = async (data: IUser) => {
  const result = await axios.post<ApiResponse<{ user: IUser }>>(
    "/auth/register",
    data,
  );
  return result.data.body.user;
};

export const useRegister = () =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerFn,
  });

export const useCurrentUser = () => {
  const { data } = useSession();

  return data?.user;
};
