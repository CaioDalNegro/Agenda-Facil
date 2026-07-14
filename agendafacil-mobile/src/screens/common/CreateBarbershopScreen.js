import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";

import api from "../../services/api";

import ButtonCustom from "../../components/ButtonCustom";

export default function CreateBarbershopScreen({ navigation }) {

  // Nome da barbearia
  const [name, setName] = useState("");

  // Endereço
  const [address, setAddress] = useState("");

  // Telefone
  const [phone, setPhone] = useState("");

  async function handleCreate() {

    try {

      console.log("Criando barbearia...");

      const response = await api.post(
        "/barbershops",
        {
          name,
          address,
          phone
        }
      );

      console.log(response.data);

      Alert.alert(
        "Sucesso",
        "Barbearia criada!"
      );

      navigation.replace(
        "OwnerHome"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível criar a barbearia"
      );
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Cadastro da Barbearia
      </Text>

      <TextInput
        placeholder="Nome da Barbearia"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Endereço"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <ButtonCustom
        title="Criar Barbearia"
        onPress={handleCreate}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212"
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#444",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  }
});