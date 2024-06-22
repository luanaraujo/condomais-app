import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../style/MainStyle";
import "react-native-gesture-handler";
import usuarioService from "./services/UsuarioService";
import { ActivityIndicator, Provider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(false);

  const entrar = async () => {
    setLoading(true);
    let data = {
      username: email,
      password: password,
    };

    try {
      const response = await usuarioService.login(data);
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Principal" }],
      });
    } catch (error) {
      setLoading(false);
      console.error(
        "Erro ao tentar login:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Erro",
        error.response ? error.response.data.message : "Usuário não existe"
      );
    }
  };

  const logarComToken = async (token) => {
    setLoadingToken(true);
    let data = { token };

    try {
      const response = await usuarioService.loginComToken(data);
      setLoadingToken(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Principal" }],
      });
    } catch (error) {
      setLoadingToken(false);
      console.error(
        "Erro ao tentar login com token:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cadastrar = () => {
    navigation.navigate("Cadastro");
  };

  useEffect(() => {
    const verificarToken = async () => {
      const token = await AsyncStorage.getItem("TOKEN");
      if (token) {
        logarComToken(token);
      }
    };
    verificarToken();
  }, []);

  return (
    <Provider>
      <View style={[styles.container, specificStyle.specificContainer]}>
        {!isLoadingToken && (
          <>
            <Image
              source={require("../assets/condomais.png")}
              style={specificStyle.logo}
            />
            <Input
              placeholder="E-mail"
              leftIcon={{ type: "font-awesome", name: "envelope", size: 18 }}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
            />
            <Input
              placeholder="Senha"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />
            {isLoading && <ActivityIndicator />}

            {!isLoading && (
              <Button
                icon={{
                  name: "check",
                  type: "font-awesome",
                  size: 15,
                  color: "white",
                }}
                iconContainerStyle={{ marginRight: 10 }}
                title="Entrar"
                buttonStyle={specificStyle.button}
                onPress={entrar}
              />
            )}

            <Button
              title="Cadastro"
              icon={{
                name: "user",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconContainerStyle={{ marginRight: 10 }}
              buttonStyle={specificStyle.button}
              onPress={cadastrar}
            />
          </>
        )}
      </View>
    </Provider>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 190,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#4ba7ea",
    marginTop: 10,
    borderRadius: 30,
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
    width: 200,
  },
});
