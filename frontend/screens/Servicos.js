import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import servicoService from "./services/ServicoService";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarServicos();
    }
  }, [isFocused]);

  const carregarServicos = async () => {
    setLoading(true);
    try {
      const response = await servicoService.listar();
      // Ordena os serviços por ID em ordem decrescente
      const sortedServices = response.sort((a, b) => b.id - a.id);
      setServicos(sortedServices);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar lembretes:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={servicos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    backgroundColor: "#4ba7ea",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 370,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
