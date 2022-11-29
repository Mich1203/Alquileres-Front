import { useMutation, useQuery } from "@tanstack/react-query";
import { IPlace } from "../interfaces/places";
import { useSession } from "next-auth/react";
import axios from "../hooks/axios";
import { ApiResponse } from "../interfaces/general.interface";

const fetchPlaces = async (): Promise<IPlace[]> => {
  const result = await axios.get<ApiResponse<IPlace[]>>("/places");
  return result.data.body;
};

const createPlaceFn = async (data: IPlace): Promise<IPlace> => {
  const result = await axios.post<ApiResponse<IPlace>>("/places", data);
  return result.data.body;
};

const fetchSinglePlace = (id: number) => async (): Promise<IPlace> => {
  const result = await axios.get<ApiResponse<IPlace>>(`/places/${id}`);
  return result.data.body;
};

export const usePlaces = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["places"],
    queryFn: fetchPlaces,
    enabled: session.status === "authenticated",
  });
};

export const useSinglePlace = (id?: number) => {
  return useQuery({
    queryKey: ["places", id],
    queryFn: fetchSinglePlace(id ?? 0),
    enabled: !!id,
  });
};

export const useCreatePlace = () => {
  return useMutation({
    mutationKey: ["create-place"],
    mutationFn: createPlaceFn,
  });
};
