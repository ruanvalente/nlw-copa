import React, { useCallback, useState } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Icon, useToast, VStack } from "native-base";

import { Octicons } from "@expo/vector-icons";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { EmptyPoolList } from "../components/EmptyPoolList";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardPros } from "../components/PoolCard";

import { api } from "../services/api";

export function Pools() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolCardPros[]>([]);
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  async function fetchPools() {
    try {
      setIsLoading(true);
      const pools = await api.get("/pools");
      setPools(pools.data.pools);
    } catch (error) {
      toast.show({
        title:
          "Não foi possível carregar os bolões. Por favor, tente novamente mais tarde.",
        placement: "bottom",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mb={4}
        mx={5}
        pb={4}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" />}
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}
