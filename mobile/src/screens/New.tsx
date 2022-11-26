import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function New() {
  const [poolTitle, setPoolTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePoolCreate() {
    if (!poolTitle.trim()) {
      return toast.show({
        title: "Por favor, informe o título para criação do seu bolão !",
        placement: "top",
        bgColor: "yellow.600",
      });
    }
    try {
      setIsLoading((oldValue) => !oldValue);
      await api.post("/pools", { title: poolTitle });

      toast.show({
        title: "Parabéns, seu bolão foi criado com sucesso !",
        placement: "top",
        bgColor: "green.500",
      });

      setPoolTitle("");
    } catch (error) {
      console.log(error);
      toast.show({
        title:
          "Não foi possível realizar a criação do seu bolão ! Por favor, tente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          my={8}
          fontFamily="heading"
          fontSize="xl"
          color="white"
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual nome do seu bolão?"
          my={4}
          onChangeText={setPoolTitle}
          value={poolTitle}
        />
        <Button
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" textAlign="center" mt={4}>
          Após criar seu bolão, você receberá um {"\n"} código único que poderá
          usar para convidar {"\n"} outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
