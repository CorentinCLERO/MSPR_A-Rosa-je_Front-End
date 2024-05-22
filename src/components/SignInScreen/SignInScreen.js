import React, { useContext, useState } from "react";
import { StyleSheet, Image, Text, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import MyContext from "../../Context/MyContext";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";


export default function SignInScreen() {
  const { handleSignIn } = useContext(MyContext);
  const [isInProgress, setIsInProgress] = useState(false);
  const [webClientId, setWebClientId] = useState("990680309932-lh449a7erf1ffkl3mdo88kvftj86tj09.apps.googleusercontent.com");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [devButtonIsVisible, setDevButtonIsVisible] = useState(false);

  const isValidEmail = () => {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signInWithEmail = async () => {
    setIsInProgress(true);
    if (!isValidEmail(email)) {
      setIsInProgress(false);
      Alert.alert("Erreur", "L'email n'est pas valide.");
      return;
    }
    if (password.length < 6) {
      setIsInProgress(false);
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    await handleSignIn({email: email, password: password});
    setIsInProgress(false);
  };

  const signIn = async () => {
    setIsInProgress(true);
    try {
      setIsInProgress(false);
      GoogleSignin.configure({
        webClientId:
          // `${process.env.EXPO_PUBLIC_WEB_CLIENT_ID}`
          webClientId
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      handleSignIn(userInfo);
    } catch (error) {
      setIsInProgress(false);
      Alert.alert("Erreur", `La connexion avec Google a échoué : ${error.message}`, [
        {
          text: "Réessayer",
          onPress: () => setIsInProgress(false),
        }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text} onPress={() => setDevButtonIsVisible(prev => !prev)}>Connecte toi !</Text>
        {devButtonIsVisible && <SegmentedButtons
          value={webClientId}
          onValueChange={setWebClientId}
          buttons={[
            {
              label: "kml",
              value: "990680309932-e9467emdgag76bujtb3bs4ane88k6kml.apps.googleusercontent.com",
            },
            {
              label: "ido",
              value: "990680309932-gi9rc6e7gi7o7hli5fvkc44u5s0neido.apps.googleusercontent.com",
            },
            {
              label: "puk",
              value: "990680309932-jds76j1n4vce5slatmco8jcbcoeo5puk.apps.googleusercontent.com",
            },
            {
              label: "q84",
              value: "990680309932-t5tm3f2v3s7j9s6jujj2q23al8d9vq84.apps.googleusercontent.com",
            },
            {
              label: "j09",
              value: "990680309932-lh449a7erf1ffkl3mdo88kvftj86tj09.apps.googleusercontent.com",
            },
          ]}
        />}
        <Image
          source={require("../../../assets/logos/logo-removebg.png")}
          style={styles.logo}
        />
        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={isInProgress}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />
        <Button mode="contained" onPress={signInWithEmail} disabled={isInProgress}>
          <Text>Connexion</Text>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  signInButton: {
    height: 60
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20
  },
  input: {
    width: "90%",
    maxWidth: 300,
    marginVertical: 10,
  },
  logo: {
    marginVertical: 20,
    maxWidth: 200,
    resizeMode: "contain"
  },
});
