import { Button, Input, Loading, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { BsPerson, BsRulers } from "react-icons/bs";
import { FaToilet, FaBed } from "react-icons/fa";
import FilePicker from "../../components/common/FilePicker";
import { useCreatePlace } from "../../hooks/places";

type TForm = {
  address: string;
  description: string;
  capacity: number;
  no_of_bathrooms: number;
  no_of_rooms: number;
  measurements: number;
  measure_units: string;
  price: number;
  files: File[];
  is_rented: boolean;
};

const defaultValues: TForm = {
  files: [],
  address: "",
  description: "",
  capacity: 1,
  measure_units: "",
  measurements: 0,
  no_of_bathrooms: 1,
  no_of_rooms: 1,
  price: 1,
  is_rented: false,
};

const AddPlacePage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<TForm>({ defaultValues });
  const { mutateAsync, isLoading } = useCreatePlace();
  const router = useRouter();

  const handleCreatePlace = async (data: TForm) => {
    try {
      await mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectFiles = (files: File[]) => {
    setValue("files", files);
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreatePlace)}
      className="flex flex-col items-center py-10 gap-5 px-5"
    >
      <FilePicker onSelectFiles={handleSelectFiles} />
      <Textarea
        css={{ minWidth: "60%" }}
        {...register("address", { required: true })}
        label="Dirección"
        rows={3}
        helperText={errors.address?.type}
        helperColor="error"
      />
      <Textarea
        css={{ minWidth: "60%" }}
        {...register("description", { required: true })}
        label="Descripción"
        rows={10}
        helperText={errors.description?.type}
        helperColor="error"
      />
      <div className="flex justify-between gap-10 w-[60%]">
        <Input
          css={{ flexGrow: 1 }}
          type="number"
          {...register("capacity", { required: true })}
          label="Capacidad"
          min={1}
          contentRight={<BsPerson width="16" height="16" fill="#ffff" />}
          helperText={errors.capacity?.type}
          helperColor="error"
        />
        <Input
          css={{ flexGrow: 1 }}
          type="number"
          {...register("measurements", { required: true })}
          label="Medidas"
          min={1}
          contentRight={<BsRulers width="16" height="16" fill="#ffff" />}
          helperText={errors.measurements?.message}
          helperColor="warning"
        />
      </div>
      <div className="flex justify-between gap-10 w-[60%]">
        <Input
          css={{ flexGrow: 1 }}
          type="number"
          {...register("no_of_bathrooms", { required: true })}
          label="# de baños"
          min={1}
          contentRight={<FaToilet width="16" height="16" fill="#ffff" />}
          helperText={errors.no_of_bathrooms?.message}
          helperColor="error"
        />
        <Input
          css={{ flexGrow: 1 }}
          type="number"
          {...register("no_of_rooms", { required: true })}
          label="# de habitaciones"
          min={1}
          contentRight={<FaBed width="16" height="16" fill="#ffff" />}
          helperText={errors.no_of_rooms?.message}
          helperColor="error"
        />
      </div>
      <Input
        css={{ minWidth: "30%" }}
        type="number"
        {...register("price", { required: true })}
        label="Precio"
        labelRight="$"
        min={1}
        helperText={errors.price?.message}
        helperColor="error"
      />
      <Button
        className="mt-5"
        css={{ backgroundColor: "$popper", width: "60%" }}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading type="points" color="currentColor" size="sm" />
        ) : (
          "Crear Vivienda"
        )}
      </Button>
    </form>
  );
};

export default AddPlacePage;
