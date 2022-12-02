import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Loading,
  Row,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import AuthWrapper from "../../components/common/AuthWrapper";
import { useRegister } from "../../hooks/auth";

type TForm = {
  id: string;
  name: string;
  date_of_birth: Date | null;
  phone_number: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: TForm = {
  id: "",
  name: "",
  date_of_birth: null,
  phone_number: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage: NextPage = () => {
  const { mutateAsync, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<TForm>({ defaultValues });

  const handleRegister = async (data: TForm) => {
    const { date_of_birth, email, password } = data;
    if (!date_of_birth) {
      return;
    }

    try {
      await mutateAsync({
        ...data,
        date_of_birth: date_of_birth.toISOString(),
      });
      signIn("credentials", {
        email,
        password,
        callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password");
  return (
    <AuthWrapper>
      <div className="grow flex justify-center items-center h-full">
        <Card className="w-3/4 py-10 px-14 flex items-center flex-col bg-[#353950]">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full flex gap-y-5 flex-col"
          >
            <Container className="p-0">
              <Row className="gap-5">
                <Col>
                  <Input
                    css={{
                      color: "$clear",
                    }}
                    {...register("id", { required: true })}
                    label="Cedula"
                    fullWidth
                    helperColor="error"
                    helperText={errors.id?.type}
                  />
                </Col>
                <Col>
                  <Input
                    css={{
                      color: "$clear",
                    }}
                    fullWidth
                    {...register("name", { required: true })}
                    label="Nombre Completo"
                    helperColor="error"
                    helperText={errors.name?.type}
                  />
                </Col>
              </Row>
              <Spacer y={1} />
              <Row className="gap-5">
                <Col>
                  <Input
                    css={{
                      color: "$clear",
                    }}
                    fullWidth
                    type="date"
                    {...register("date_of_birth", {
                      required: true,
                      valueAsDate: true,
                    })}
                    label="Fecha de nacimiento"
                    helperColor="error"
                    helperText={errors.date_of_birth?.type}
                  />
                </Col>
                <Col>
                  <Input
                    css={{
                      color: "$clear",
                    }}
                    fullWidth
                    {...register("phone_number", { required: true })}
                    label="Numero de telefono"
                    placeholder="+58 79781512"
                    helperColor="error"
                    helperText={errors.phone_number?.type}
                  />
                </Col>
              </Row>
              <Spacer y={1} />
              <Row>
                <Col>
                  <Textarea
                    css={{ color: "$clear" }}
                    {...register("address", { required: true })}
                    label="Dirección"
                    fullWidth
                    helperColor="error"
                    helperText={errors.address?.type}
                  />
                </Col>
              </Row>
              <Spacer y={1} />
              <Row>
                <Col span={6}>
                  <Input
                    css={{
                      color: "$clear",
                    }}
                    {...register("email", { required: true })}
                    label="E-mail"
                    fullWidth
                    helperColor="error"
                    helperText={errors.email?.type}
                  />
                </Col>
              </Row>
              <Spacer y={1} />
              <Row className="gap-5">
                <Col>
                  <Input.Password
                    css={{
                      color: "$clear",
                    }}
                    label="Contraseña"
                    {...register("password", { required: true })}
                    fullWidth
                    helperColor="error"
                    helperText={errors.password?.type}
                  />
                </Col>
                <Col>
                  <Input.Password
                    css={{
                      color: "$clear",
                    }}
                    label="Confirmar contraseña"
                    {...register("confirmPassword", {
                      required: true,
                      validate: {
                        shouldMatch: (value: string) =>
                          password === value || "Passwords don't match",
                      },
                    })}
                    fullWidth
                    helperColor="error"
                    helperText={errors.confirmPassword?.type}
                  />
                </Col>
              </Row>
            </Container>
            <Spacer y={1} />
            <Button
              css={{ backgroundColor: "$popper" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </AuthWrapper>
  );
};

export default RegisterPage;
