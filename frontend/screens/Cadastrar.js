import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import styles from "../style/MainStyle";

export default function Cadastrar({ navigation }) {
  function CadastroServico() {
    navigation.navigate("CadastroServico");
  }

  function CadastroPost() {
    navigation.navigate("CadastroPost");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>O que você quer cadastrar?</Text>
      <View style={specificStyle.buttonContainer}>
        <Button
          title="Post"
          buttonStyle={specificStyle.postButton}
          icon={{
            name: "comment",
            size: 15,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          onPress={() => CadastroPost(navigation)}
        />
        <Button
          title="Lembrete"
          buttonStyle={specificStyle.serviceButton}
          icon={{
            name: "note",
            size: 15,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 5 }}
          onPress={() => CadastroServico(navigation)}
        />
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  postButton: {
    backgroundColor: "#4ba7ea",
    borderRadius: 30,
    height: 50,
    width: 150,
    marginHorizontal: 10,
  },
  serviceButton: {
    backgroundColor: "#4ba7ea",
    borderRadius: 30,
    height: 50,
    width: 150,
    marginHorizontal: 10,
  },
});
