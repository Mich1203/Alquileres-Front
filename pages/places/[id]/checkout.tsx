import {
  Button,
  Container,
  Input,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import numeral from "numeral";
import React from "react";
import { useForm } from "react-hook-form";
import { FaBed, FaToilet, FaUsers } from "react-icons/fa";
import AppWrapper from "../../../components/common/AppWrapper";
import { useUserAccount } from "../../../hooks/accounts";
import { useRentPlace, useSinglePlace } from "../../../hooks/places";

type TForm = {
  months: number;
  no_of_people: number;
};

const defaultValues: TForm = {
  months: 1,
  no_of_people: 1,
};

const CheckoutPage = () => {
  const router = useRouter();
  const { handleSubmit, register, watch } = useForm<TForm>({ defaultValues });
  const { data: place } = useSinglePlace(+(router.query.id ?? 0));
  const { data: account } = useUserAccount();
  const { mutateAsync: rentAsync } = useRentPlace();

  const months = watch("months");

  if (!place) {
    return <Loading />;
  }
  const total = place.price * months;
  const enoughBalance =
    total <= (numeral(account?.account.balance).value() ?? 0);

  const handleRent = async (data: TForm) => {
    if (!place.id) return;
    try {
      await rentAsync({ placeId: place.id, ...data });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppWrapper>
      <div className="p-4 flex w-full">
        <div className="flex flex-col w-4/6">
          <div className="flex p-0">
            <Image
              width={300}
              height={300}
              src={place.images?.at(0) ?? ""}
              alt="image of place"
            />
            <div className="flex flex-col px-5">
              <Text className="font-bold">
                # de habitaciones
                <br />
                <FaBed /> {place.no_of_rooms}
              </Text>
              <Text className="font-bold">
                # de habitaciones baños
                <br />
                <FaToilet /> {place.no_of_rooms}
              </Text>
              <Text className="font-bold">
                Capacidad
                <br />
                <FaUsers /> {place.capacity}
              </Text>
              <Text className="font-bold">
                Direccion
                <br />
                {place?.address}
              </Text>
            </div>
          </div>
          <div className="w-full my-4 border-solid border-b-[1px] border-white"></div>
          <Container display="flex" justify="flex-end" className="font-bold">
            <text>{`TOTAL: ${numeral(total).format("0,0.00 $")}`} </text>
          </Container>
        </div>
        <form
          className="flex flex-col justify-start grow"
          onSubmit={handleSubmit(handleRent)}
        >
          <Input
            {...register("months", { required: true, valueAsNumber: true })}
            css={{
              width: "66%",
            }}
            type="number"
            label="Meses a alquilar"
            min={1}
          />
          <Spacer y={1} />
          <Input
            {...register("no_of_people", {
              required: true,
              valueAsNumber: true,
            })}
            css={{
              width: "66%",
            }}
            type="number"
            label="Personas a alquilar"
            min={1}
          />
          <Spacer y={2} />
          <Text className="font-bold">
            BALANCE: {numeral(account?.account.balance).format("0,0.00 $")}
          </Text>
          <Button
            type="submit"
            className="w-full"
            css={{ bgColor: "$popper" }}
            disabled={!enoughBalance}
          >
            Alquilar
          </Button>
          {!enoughBalance && (
            <Text color="error">
              No tiene suficiente dinero para alquilar esta vivienda
            </Text>
          )}
        </form>
      </div>
    </AppWrapper>
  );
};

export default CheckoutPage;
