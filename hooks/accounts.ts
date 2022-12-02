import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios";
import { useSession } from "next-auth/react";
import { ApiResponse } from "../interfaces/general.interface";
import { IAccount } from "../interfaces/account.interface";
import { ITransaction } from "../interfaces/transaction.interface";
import { useCurrentUser } from "./auth";

type TAccountResponse = { account: IAccount; transactions: ITransaction[] };

const fetchAccountFn = (userId: string) => async () => {
  const result = await axios.get<ApiResponse<TAccountResponse>>(
    "/accounts/" + userId,
  );
  return result.data.body;
};

const modifyBalanceFn = async (data: { userId: string; amount: number }) => {
  const result = await axios.put<ApiResponse<TAccountResponse>>(
    `/accounts/${data.userId}/balance`,
    data,
  );
  return result.data.body;
};

export const useUserAccount = () => {
  const { data, status } = useSession();

  return useQuery({
    queryKey: ["accounts", { userId: data?.user?.id }],
    queryFn: fetchAccountFn(data?.user?.id ?? ""),
    enabled: status === "authenticated",
  });
};

export const useInvalidateUserAccount = () => {};

export const useModifyBalance = () => {
  const queryClient = useQueryClient();
  const user = useCurrentUser();

  return useMutation({
    mutationKey: [user?.id],
    mutationFn: modifyBalanceFn,
    onMutate: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });
};
