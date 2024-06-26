import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Principal from "./screens/Principal";
import Cadastro from "./screens/Cadastro";
import CadastroPost from "./screens/CadastroPost";
import CadastroServico from "./screens/CadastroServico";
import Config from "./util/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Principal"
        component={Principal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CadastroPost"
        component={CadastroPost}
        options={{ headerTitle: "Cadastro de Post" }}
      />
      <Stack.Screen
        name="CadastroServico"
        component={CadastroServico}
        options={{ headerTitle: "Cadastrar Lembrete" }}
      />
    </Stack.Navigator>
  );
}

function defineInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response.status == 401 && err.config && !err.config._retry) {
          originalReq._retry = true;
          AsyncStorage.getItem("TOKEN").then((token) => {
            let res = axios
              .put(`${Config.API_URL}token`, { oldToken: token })
              .then((res) => {
                AsyncStorage.setItem("TOKEN", res.data.access_token);
                originalReq.headers[
                  "Authorization"
                ] = `Bearer ${res.data.access_token}`;
                return axios(originalReq);
              });
            resolve(res);
          });
        } else {
          reject(err);
        }
      });
    }
  );
}

export default function App() {
  defineInterceptor();
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
