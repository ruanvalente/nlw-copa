import React from "react";
import { NativeBaseProvider, Text, Center } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="black">
        <Text color="white" fontSize={24}>
          NLW - COPA
        </Text>
      </Center>
    </NativeBaseProvider>
  );
}
