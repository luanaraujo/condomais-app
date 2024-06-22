import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../util/config";

class UsuarioService {
  async cadastrar(data) {
    try {
      const response = await axios({
        url: Config.API_URL + "usuario",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: {
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao cadastrar:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(Config.API_URL + "usuario/login", data);
      const token = response.data.access_token;
      await AsyncStorage.setItem("TOKEN", token);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async loginComToken(data) {
    try {
      const response = await axios({
        url: Config.API_URL + "usuario/login-token",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.data.access_token) {
        const token = response.data.access_token.toString();
        await AsyncStorage.setItem("TOKEN", token);
        return response.data;
      } else {
        throw new Error("Token inválido na resposta");
      }
    } catch (error) {
      console.error(
        "Erro ao fazer login com token:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async getPerfil(token) {
    try {
      console.log("Token enviado para obter perfil:", token); // Adicione este log
      const response = await axios({
        url: Config.API_URL + "usuario",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log("Resposta do perfil:", response.data); // Adicione este log
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao obter perfil:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async atualizarPerfil(token, { nome, email, cpf, avatar }) {
    try {
      const response = await axios({
        url: Config.API_URL + "usuario",
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          nome,
          email,
          cpf,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao atualizar perfil:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
