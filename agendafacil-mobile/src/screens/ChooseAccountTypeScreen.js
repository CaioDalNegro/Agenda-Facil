import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ChooseAccountTypeScreen({ navigation }) {

  function selectRole(role) {
    navigation.navigate("Register", { role });
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Como deseja usar o AgendaFácil?
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => selectRole("CLIENT")}
      >
        <Text style={styles.text}>
          Quero agendar serviços
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => selectRole("OWNER")}
      >
        <Text style={styles.text}>
          Tenho uma barbearia
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30
  },

  button: {
    backgroundColor: "#1E88E5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15
  },

  text: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18
  }
});