import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonCustom({ title, onPress }) {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  text: {
    color: "#FFF",
    fontWeight: "bold"
  }

});