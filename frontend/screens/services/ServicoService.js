import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../../util/config";

class ServicoService {
  async cadastrar(data) {
    let token = await AsyncStorage.getItem("TOKEN");
    try {
      const response = await axios({
        url: Config.API_URL + "servico",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async listar() {
    try {
      let token = await AsyncStorage.getItem("TOKEN");
      const response = await axios({
        url: Config.API_URL + "servico",
        method: "GET",
        timeout: 5000,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const servicoService = new ServicoService();
export default servicoService;
