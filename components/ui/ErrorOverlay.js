import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

const ErrorOverlay = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{props.error}</Text>
      <Button onPress={props.onPress}>Close</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
