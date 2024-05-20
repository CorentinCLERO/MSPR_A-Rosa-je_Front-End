import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../functions/colors";
import { Button, SegmentedButtons } from "react-native-paper";
import MyContext from "../Context/MyContext";
import { GardienSVG } from "../../assets/iconesTabs/Gardien";
import { ProprietaireSVG } from "../../assets/iconesTabs/Proprietaire";
import { BotanisteSVG } from "../../assets/iconesTabs/Botaniste";
import FirstConnection from "../FirstConnection/FirstConnection";
import ListAdresses from "./ListAdresses";

const SettingPage = () => {
  const { deconnection, pageDisplayed, setPageDisplayedByRole, userRoleLevel } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Paramètres</Text>
          <SegmentedButtons
            value={pageDisplayed}
            onValueChange={setPageDisplayedByRole}
            buttons={[
              {
                label: "Propriétaire",
                value: "owner",
                disabled: userRoleLevel < 1,
                checkedColor: colors.owner,
                icon: (...props) => <ProprietaireSVG fill={props[0].color} width="24" height="24" />,
              },
              {
                label: "Gardien",
                value: "keeper",
                disabled: userRoleLevel < 2,
                checkedColor: colors.keeper,
                icon: (...props) => <GardienSVG fill={props[0].color} width="24" height="24" />,
              },
              { 
                label: "Botaniste", 
                value: "botanist" || "admin",
                disabled: userRoleLevel < 4,
                checkedColor: colors.botanist,
                icon: (...props) => <BotanisteSVG fill={props[0].color} width="24" height="24" />,
              },
            ]}
          />
          <FirstConnection />
          <ListAdresses />
          <Button icon="cog-outline" mode="elevated" textColor={colors.warning} onPress={deconnection} style={styles.button} buttonColor={colors.softWarning}>
            <Text>Se déconnecter</Text>
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  scrollView: {
    width: "100%",
  },
  button: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  topContainer: {
    alignItems: "center",
    gap: 20
  },
});

export default SettingPage;