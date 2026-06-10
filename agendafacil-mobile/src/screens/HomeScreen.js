import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>

      {/* Texto exibido após autenticação */}
      <Text style={styles.text}>
        Usuário autenticado
      </Text>

    </View>
  );
}

// Estilos da tela Home =====================================================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF"
  }

});