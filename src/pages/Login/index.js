import { Button, Input, PasswordInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  let database;
  if (typeof window !== "undefined") {
    database = JSON.parse(localStorage.getItem("database"));
  }

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 1 ? "O username deve ter pelo menos 1 caractere" : null,
      password: (value) =>
        value.length < 8 ? "A senha deve ter pelo menos 8 dígitos" : null,
    },
  });

  const handleForm = (values) => {
    const exists = isRegistered(values.username, values.email);

    if (exists) {
      console.log(database.users);
      const user = database.users.find(
        (item) => item.username === values.username
      );
      localStorage.setItem("userId", user.id);
      router.push("/");
      // alert("user " + user.id);
      // alert("exist");
    } else {
      alert("erro");
    }
  };

  const isRegistered = (username, senha) => {
    database.users.filter((item) => item.username === username) &&
      database.users.filter((item) => item.password === senha);
    return true;
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
            <PasswordInput
              required
              placeholder="Senha"
              {...form.getInputProps("password")}
            />
          </div>
          <Button type="submit" className="w-60 m-10 bg-gray-950 self-center">
            Confirmar
          </Button>
          <Text>
            Ainda não tem uma conta? <Link href={`/Signup`}>Cadastre-se</Link>
          </Text>
        </form>
      </div>
    </main>
  );
}
