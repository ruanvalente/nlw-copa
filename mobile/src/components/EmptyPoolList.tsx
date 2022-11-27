import { Row, Text, Pressable, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function EmptyPoolList() {
  const { navigate } = useNavigation();
  return (
    <VStack flex={1} textAlign="center">
      {/* <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {"\n"} nenhum bolão, que tal
      </Text>

      <Pressable>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          buscar um por código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text> */}
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {"\n"}
        nenhum bolão, que tal {"\n"}
      </Text>
      <Row justifyContent="center" mt={-5}>
        <Pressable onPress={() => navigate("find")}>
          <Text
            textDecorationLine="underline"
            color="yellow.500"
            textDecoration="underline"
            textAlign="center"
          >
            buscar um por código
          </Text>
        </Pressable>
        <Text color="white" fontSize="sm" textAlign="center" mx={1}>
          ou
        </Text>
        <Pressable onPress={() => navigate("new")}>
          <Text textDecorationLine="underline" color="yellow.500">
            criar um novo
          </Text>
        </Pressable>
        <Text color="white" fontSize="sm" textAlign="center">
          ?
        </Text>
      </Row>
    </VStack>
  );
}
