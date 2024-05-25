import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { colors } from "../functions/colors";
import { Button, SegmentedButtons } from "react-native-paper";
import MyContext from "../Context/MyContext";
import { GardienSVG } from "../../assets/iconesTabs/Gardien";
import { ProprietaireSVG } from "../../assets/iconesTabs/Proprietaire";
import { BotanisteSVG } from "../../assets/iconesTabs/Botaniste";
import FirstConnection from "../FirstConnection/FirstConnection";
import ListAdresses from "./ListAdresses";

const SettingPage = () => {
  const { deconnection, pageDisplayed, setPageDisplayedByRole, userRoleLevel, deleteUser } = useContext(MyContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(false);
    deleteUser();
  };

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
          <Button icon="alert-outline" mode="elevated" textColor={colors.warning} onPress={() => setModalVisible(true)} style={styles.button} buttonColor={colors.softWarning}>
            <Text>Supprimer le compte</Text>
          </Button>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmer la suppression</Text>
            <Text style={styles.modalText}>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleDelete}>
                <Text style={[styles.modalButtonText, styles.modalButtonDeleteText]}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  modalButtonDelete: {
    backgroundColor: colors.warning,
  },
  modalButtonText: {
    fontSize: 16,
  },
  modalButtonDeleteText: {
    color: colors.white,
  },
});

export default SettingPage;
