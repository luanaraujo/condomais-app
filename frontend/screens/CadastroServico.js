import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { Provider } from "react-native-paper";
import servicoService from "./services/ServicoService";
import { useNavigation } from "@react-navigation/native";

export default function CadastroServico() {
  const [titulo, setTitulo] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescricao, setErrorDescricao] = useState(null);
  const navigation = useNavigation();

  const validar = () => {
    let error = false;

    if (!titulo) {
      setErrorTitulo("Preencha o título");
      error = true;
    } else {
      setErrorTitulo(null);
    }

    if (!descricao) {
      setErrorDescricao("Preencha a descrição do lembrete");
      error = true;
    } else {
      setErrorDescricao(null);
    }

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);

      let data = {
        titulo: titulo,
        descricao: descricao,
      };

      servicoService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          if (response && response.data && response.data.mensagem) {
            Alert.alert("Sucesso", response.data.mensagem);
          } else {
            Alert.alert("Sucesso", "Lembrete cadastrado com sucesso");
          }
          // Limpar os campos de texto
          setTitulo(null);
          setDescricao(null);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            // O backend retornou um código de erro e dados de resposta
            console.error("Erro no backend:", error.response.data);
            Alert.alert("Erro", error.response.data.message); // Exibe mensagem de erro do backend
          } else if (error.request) {
            // A requisição foi feita, mas não houve resposta do servidor
            console.error("Erro de requisição:", error.request);
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
          } else {
            // Outros erros
            console.error("Erro inesperado:", error.message);
            Alert.alert("Erro", "Houve um erro inesperado");
          }
        });
    }
  };

  const cancelar = () => {
    navigation.goBack(); // Navegue de volta para a tela anterior
  };

  return (
    <Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={specificStyle.specificContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      >
        <ScrollView style={{ width: "100%" }}>
          <Image
            source={require("../assets/condomais.png")}
            style={[specificStyle.logo, { alignSelf: "center" }]}
          />
          <Input
            placeholder="Título"
            placeholderTextColor="#999999"
            onChangeText={(value) => {
              setTitulo(value);
              setErrorTitulo(null);
            }}
            errorMessage={errorTitulo}
            value={titulo}
          />
          <Text style={specificStyle.label}>Descrição</Text>
          <TextInput
            style={specificStyle.textAreaContainer}
            placeholderTextColor="#999999"
            onChangeText={(value) => {
              setDescricao(value);
              setErrorDescricao(null);
            }}
            value={descricao}
            multiline
            numberOfLines={6}
            errorMessage={errorDescricao}
          />

          {isLoading && <Text>Carregando...</Text>}
          {!isLoading && (
            <View style={specificStyle.buttonContainer}>
              <Button
                title="Cadastrar"
                icon={{
                  name: "check-circle",
                  size: 18,
                  color: "white",
                }}
                iconContainerStyle={{ marginRight: 10 }}
                buttonStyle={[specificStyle.button, { alignSelf: "center" }]}
                onPress={() => salvar()}
              />

              <Button
                title="Cancelar"
                icon={{
                  name: "cancel",
                  size: 18,
                  color: "white",
                }}
                iconContainerStyle={{ marginRight: 10 }}
                buttonStyle={[
                  specificStyle.cancelButton,
                  { alignSelf: "center" },
                ]}
                onPress={() => cancelar()}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 200,
  },
  button: {
    backgroundColor: "#4ba7ea",
    borderRadius: 30,
    height: 50,
    width: 150,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#c00",
    borderRadius: 30,
    height: 50,
    width: 150,
    marginHorizontal: 10,
  },
  textAreaContainer: {
    borderColor: "#999999",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    height: 200,
    padding: 5,
    marginBottom: 45,
  },

  label: {
    marginBottom: 5,
    marginLeft: 10,
    color: "#999999",
    fontSize: 18,
  },
  logo: {
    width: 120,
    height: 140,
    marginBottom: 15,
  },
});
