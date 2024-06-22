import { StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4ba7ea",
    borderRadius: 30,
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
    width: 100,
  },

  container: {
    marginBottom: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maskedInput: {
    marginBottom: 5,
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: "#999999",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "flex-start",
  },
  containerMask: {
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#f00",
    fontSize: 12,
  },
});

export default styles;
