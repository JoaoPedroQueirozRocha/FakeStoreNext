import { Button, Input, Title, PasswordInput, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginSignup() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (value) =>
        value.length < 1 ? "O username deve ter pelo menos 1 caractere" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "A senha deve ter pelo menos 8 dígitos" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "As senhas não coincidem" : null,
    },
  });

  const handleForm = (values) => {
    let database = JSON.parse(localStorage.getItem("dataUsers")) || {
      users: [],
      nextId: 1,
    };

    const isDuplicate = checkDuplicate(values.username, values.email);

    if (isDuplicate) {
      alert("Em uso");
      return;
    }

    const newUser = {
      id: database.nextId,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    database.nextId = 1 + database.nextId;
    database.users.push(newUser);
    database = JSON.stringify(database);
    localStorage.removeItem("dataUsers");
    localStorage.setItem("dataUsers", database);
    localStorage.setItem("userKey", newUser.id);
    router.push("/");
  };

  const checkDuplicate = (username, email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isUsernameInUse = users.some((user) => user.username === username);

    const isEmailInUse = users.some((user) => user.email === email);

    return isUsernameInUse || isEmailInUse;
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col" style={{ width: 600 }}>
        <form
          onSubmit={form.onSubmit(handleForm)}
          className="flex flex-col w-full bg-blue-500 rounded p-5 justify-evenly"
          style={{ height: 600 }}
        >
          <Title className="self-center">Cadastre-se</Title>
          <div className="flex flex-col gap-10 w-96 h-60 self-center ">
            <Input
              required
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <Input
              required
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              placeholder="Senha"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              required
              placeholder="Confirme a senha"
              {...form.getInputProps("confirmPassword")}
            />
          </div>
          <Button type="submit" className="w-60 m-10 bg-gray-950 self-center">
            Confirmar
          </Button>
          <Text>
            Já tem uma conta? <Link href={`/Login`}>Faça Login</Link>
          </Text>
        </form>
      </div>
    </main>
  );
}
