import { Text, Button as NativeBaseButton, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

export function Button({ title, type, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h="14"
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      {...rest}
    >
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontFamily="heading"
        fontWeight="bold"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
