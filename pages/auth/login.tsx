import { Button, Card, Input, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthWrapper from "../../components/common/AuthWrapper";
import { signIn } from "next-auth/react";
import Link from "next/link";

type TForm = {
  email: "";
  password: "";
};

const defaultValues: TForm = {
  email: "",
  password: "",
};

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({ defaultValues });

  const handleLogin = async ({ email, password }: TForm) => {
    try {
      setLoading(true);
      signIn("credentials", {
        email,
        password,
        callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="grow flex justify-center items-center h-full">
        <Card className="w-2/5 py-10 px-14 flex items-center flex-col bg-[#353950]">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex gap-y-10 flex-col"
          >
            <Input
              css={{
                width: "100%",
                color: "$clear",
              }}
              {...register("email")}
              labelPlaceholder="E-mail"
            />
            <Input.Password
              css={{
                width: "100%",
                color: "$clear",
              }}
              labelPlaceholder="Password"
              {...register("password")}
            />
            <Link href="/auth/register">No tienes una cuenta?</Link>
            <Button
              css={{ backgroundColor: "$popper" }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </AuthWrapper>
  );
}

export default LoginPage;
