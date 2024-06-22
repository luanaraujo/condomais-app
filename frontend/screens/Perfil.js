import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import usuarioService from "./services/UsuarioService";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Perfil = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      console.log("Token obtido:", token); // Adicione este log
      if (token) {
        const response = await usuarioService.getPerfil(token);
        console.log("Dados do perfil recebidos:", response); // Adicione este log
        setUsuario(response);
        setName(response.nome);
        setEmail(response.email);
        setCpf(response.cpf);
        setAvatar(response.avatar);
      } else {
        Alert.alert("Erro", "Token não encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error.message);
      Alert.alert("Erro", "Erro ao carregar perfil do usuário");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("TOKEN");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
      Alert.alert("Erro", "Erro ao fazer logout");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (token) {
        const data = { nome: name, email: email, cpf: cpf, avatar: avatar };
        const response = await usuarioService.atualizarPerfil(token, data);
        if (response) {
          setUsuario(response);
          Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        } else {
          Alert.alert("Erro", "Falha ao atualizar perfil");
        }
      } else {
        Alert.alert("Erro", "Token não encontrado");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      Alert.alert("Erro", "Erro ao atualizar perfil do usuário");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={require("../assets/eu.jpeg")} />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={pickImage}>
          <Text style={styles.changeAvatarButtonText}>Mudar Foto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Nome"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          editable={false}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="save" size={18} color="white" marginRight={10} />
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Icon name="logout" size={18} color="white" />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#4ba7ea",
    fontSize: 18,
  },
  form: {
    width: "80%",
    marginTop: 20,
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#4ba7ea",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#c00",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
});

export default Perfil;
