import { Button, Divider, Input, Spacer } from "@nextui-org/react";
import { NextPage } from "next";
import numeral from "numeral";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppWrapper from "../../components/common/AppWrapper";
import Modal from "../../components/common/Modal";
import { useModifyBalance, useUserAccount } from "../../hooks/accounts";
import { useCurrentUser } from "../../hooks/auth";

type TForm = {
  amount: number;
};

const Balance: NextPage = () => {
  const { handleSubmit, register } = useForm<TForm>();
  const user = useCurrentUser();
  const { data } = useUserAccount();
  const [isRecharging, setRecharging] = useState(false);
  const { mutateAsync: modifyBalAsync, isLoading } = useModifyBalance();

  const account = data?.account;
  const transactions = data?.transactions ?? [];

  const handleRecharge = async ({ amount }: TForm) => {
    if (!user) return;
    try {
      await modifyBalAsync({ userId: user?.id ?? "", amount });
      setRecharging(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppWrapper>
      <div className="flex flex-col p-10">
        <div>
          <Button color="success" onPress={() => setRecharging(true)}>
            Recargar
          </Button>
        </div>
        <h2>Balance: {numeral(account?.balance).format("0,0.00 $")}</h2>
        <Divider />
        <div className="flex flex-col">
          <h2>Transacciones</h2>
          <div className="flex flex-col"></div>
          {transactions.map((trx) => (
            <div key={trx.id}>
              <text>{`${trx.id} | ${trx.description} | ${trx.date} | ${trx.amount}`}</text>
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <Modal visible={isRecharging} onClose={() => setRecharging(false)}>
        <form onSubmit={handleSubmit(handleRecharge)}>
          <Input
            {...register("amount")}
            bordered
            fullWidth
            label="Monto a recargar"
            min={1}
          />
          <Spacer y={1} />
          <Button type="submit" css={{ width: "100%" }} disabled={isLoading}>
            Recargar
          </Button>
        </form>
      </Modal>
    </AppWrapper>
  );
};

export default Balance;
