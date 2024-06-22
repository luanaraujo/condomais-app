import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Perfil from "./Perfil";
import Busca from "./Busca";
import Posts from "./Posts";
import Servicos from "./Servicos";
import Cadastrar from "./Cadastrar";

const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Busca"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Busca"
        component={Busca}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-quote"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{
          tabBarLabel: "Cadastrar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Lembretes"
        component={Servicos}
        options={{
          tabBarLabel: "Lembretes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const specificStyle = StyleSheet.create({
  button: {
    backgroundColor: "#4ba7ea",
    borderRadius: 30,
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
    width: 300,
  },
  logo: {
    width: 150,
    height: 190,
    marginBottom: 15,
  },
});
