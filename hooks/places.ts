import { useMutation, useQuery } from "@tanstack/react-query";
import { IPlace } from "../interfaces/places.interface";
import { useSession } from "next-auth/react";
import axios from "../hooks/axios";
import { ApiResponse } from "../interfaces/general.interface";
import transformToFormData from "../utils/transformToFd";

const fetchPlaces = async (): Promise<IPlace[]> => {
  const result = await axios.get<ApiResponse<IPlace[]>>("/places");
  return result.data.body;
};

type TCreatePlace = {
  files: File[];
} & IPlace;

const createPlaceFn = async (data: TCreatePlace): Promise<IPlace> => {
  const fd = transformToFormData(data);

  const result = await axios.post<ApiResponse<IPlace>>("/places", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

const rentPlaceFn = async (data: {
  placeId: number;
  months: number;
  no_of_people: number;
}) => {
  const result = await axios.post<ApiResponse<void>>(
    `/places/${data.placeId}/rent`,
    data,
  );
  return result.data;
};

export const useRentPlace = () =>
  useMutation({
    mutationKey: ["rent-place"],
    mutationFn: rentPlaceFn,
  });
