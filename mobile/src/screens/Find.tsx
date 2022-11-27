import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";

import { Button } from "../components/Button";

import { useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [poolCode, setPoolCode] = useState("");
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    if (!poolCode.trim()) {
      return toast.show({
        title: "Por favor, informe o código para encontrar o seu bolão!",
        placement: "top",
        bgColor: "yellow.600",
      });
    }
    try {
      setIsLoading(true);

      await api.post("/pools/join", { code: poolCode });

      toast.show({
        title: `Você entrou no bolão ${poolCode} com sucesso`,
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message === "Poll not found") {
        toast.show({
          title: "Bolão não foi encontrado.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this poll") {
        toast.show({
          title: "Você já está participando deste bolão !",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "O código informado para o bolão não foi encontrado.",
        placement: "bottom",
        bgColor: "red.500",
      });
    } finally {
      setPoolCode("");
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          mb={8}
          fontFamily="heading"
          fontSize="xl"
          color="white"
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          placeholder="Qual o código do bolão?"
          my={4}
          autoCapitalize="characters"
          autoCorrect={false}
          onChangeText={setPoolCode}
          value={poolCode}
        />
        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
