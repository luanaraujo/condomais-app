import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { CheckBox, Button, Text, Input } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import styles from "../style/MainStyle";
import "react-native-gesture-handler";
import usuarioService from "./services/UsuarioService";
import { Provider } from "react-native-paper";
import CustomDialog from "../components/CustomDialog";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [errorEmails, setErrorEmails] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [errorSenha, setErrorSenha] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  let cpfField = null;
  let telefoneField = null;

  const showDialog = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setVisibleDialog(true);
  };

  const hideDialog = () => {
    setVisibleDialog(false);
    if (dialogTitle !== "Erro") {
      navigation.navigate("Login");
    }
  };

  const validar = () => {
    let error = false;

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmails("Preencha seu e-mail corretamente");
      error = true;
    }
    if (!cpfField.isValid()) {
      setErrorCpf("Preencha o seu CPF corretamente");
      error = true;
    }
    if (!nome.trim()) {
      setErrorNome("Preencha o seu nome");
      error = true;
    }
    if (!telefone.trim()) {
      setErrorTelefone("Preencha o seu telefone corretamente");
      error = true;
    }
    if (!senha.trim()) {
      setErrorSenha("Preencha a senha");
      error = true;
    }

    return !error;
  };

  const limparCampos = () => {
    setEmail("");
    setNome("");
    setCpf("");
    setTelefone("");
    setSenha("");
    setIsSelected(false);
    setErrorEmails(null);
    setErrorNome(null);
    setErrorCpf(null);
    setErrorTelefone(null);
    setErrorSenha(null);
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);
  
      let data = {
        email: email,
        cpf: cpf,
        nome: nome,
        telefone: telefone,
        senha: senha,
      };
  
      console.log("Dados enviados para cadastro:", data);
  
      usuarioService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          console.log("Resposta do cadastro:", response);
  
          // Verifique se o status indica sucesso
          if (response.status === true || response.status === 201) {
            showDialog("Sucesso", response.mensagem);
            limparCampos(); // Limpe os campos após sucesso
          } else {
            showDialog("Erro", response.mensagem);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Erro ao cadastrar:", error);
          showDialog("Erro", "Houve um erro ao processar sua solicitação");
        });
    }
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
            placeholder="E-mail"
            placeholderTextColor="#999999"
            onChangeText={(value) => {
              setEmail(value);
              setErrorEmails(null);
            }}
            keyboardType="email-address"
            errorMessage={errorEmails}
          />
          <Input
            placeholder="Nome"
            placeholderTextColor="#999999"
            onChangeText={(value) => {
              setNome(value);
              setErrorNome(null);
            }}
            errorMessage={errorNome}
          />
          <View style={styles.containerMask}>
            <TextInputMask
              placeholder="CPF"
              placeholderTextColor="#999999"
              type={"cpf"}
              value={cpf}
              onChangeText={(value) => {
                setCpf(value);
                setErrorCpf(null);
              }}
              keyboardType="number-pad"
              returnKeyType="done"
              style={styles.maskedInput}
              ref={(ref) => (cpfField = ref)}
            />
          </View>
          <Text style={styles.errorMessage}>{errorCpf}</Text>

          <View style={styles.containerMask}>
            <TextInputMask
              placeholder="Telefone"
              placeholderTextColor="#999999"
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99)",
              }}
              value={telefone}
              onChangeText={(value) => {
                setTelefone(value);
                setErrorTelefone(null);
              }}
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.maskedInput}
              ref={(ref) => (telefoneField = ref)}
            />
          </View>
          <Text style={styles.errorMessage}>{errorTelefone}</Text>

          <Input
            placeholder="Senha"
            onChangeText={(value) => setSenha(value)}
            errorMessage={errorSenha}
            secureTextEntry={true}
          />
          <CheckBox
            title="Eu aceito os termos de uso"
            checkedIcon="check"
            uncheckedIcon="square-o"
            checkedColor="green"
            uncheckedColor="red"
            checked={isSelected}
            onPress={() => setIsSelected(!isSelected)}
          />

          {isLoading && <Text>Carregando...</Text>}
          {!isLoading && (
            <Button
              title="Cadastrar"
              icon={{
                name: "user",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconContainerStyle={{ marginRight: 10 }}
              buttonStyle={specificStyle.button}
              onPress={() => salvar()}
            />
          )}
        </ScrollView>

        <CustomDialog
          titulo={dialogTitle}
          mensagem={dialogMessage}
          visible={visibleDialog}
          onClose={hideDialog}
        />
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
