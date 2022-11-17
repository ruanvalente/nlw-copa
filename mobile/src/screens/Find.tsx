import { Heading, VStack } from "native-base";

import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
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

        <Input placeholder="Qual o código do bolão?" my={4} />
        <Button title="Buscar bolão" />
      </VStack>
    </VStack>
  );
}
