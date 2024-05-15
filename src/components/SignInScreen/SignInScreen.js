import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import MyContext from "../../Context/MyContext";

GoogleSignin.configure({ webClientId: `${process.env.EXPO_PUBLIC_WEB_CLIENT_ID}` });

export default function SignInScreen() {
  const { handleSignIn } = useContext(MyContext);
  const [isInProgress, setIsInProgress] = useState(false);

  const signIn = async () => {
    setIsInProgress(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      handleSignIn(userInfo);
    } catch (error) {
      Alert.alert("Erreur", `La connexion avec Google a échoué : ${error.message}`, [
        {
          text: "Réessayer",
          onPress: () => setIsInProgress(false),
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connecte toi !</Text>
      <Image
        source={require("../../../assets/logos/logo-removebg.png")}
      />
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isInProgress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    gap: 50
  },
  signInButton: {
    width: 250,
    height: 60
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
