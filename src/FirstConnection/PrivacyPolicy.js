import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MyContext from "../Context/MyContext";

const PrivacyPolicy = () => {
  const { updateUser } = useContext(MyContext);

  const validatePrivacyPolicy = () => {
    const updatedUser = {
      validatePrivacyPolicy: true,
    };
    updateUser(updatedUser);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Politique de confidentialitée</Text>
      <Button title="Valider" onPress={validatePrivacyPolicy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PrivacyPolicy;