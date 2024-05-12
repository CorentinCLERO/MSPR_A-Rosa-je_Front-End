import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: `${process.env.EXPO_PUBLIC_WEB_CLIENT_ID}`, // client ID of type WEB for your server (needed to verify user ID and offline access)
});

export default function SignInScreen({ onSignIn }) {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSignIn(userInfo);
    } catch (error) {
      console.error(error);
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
