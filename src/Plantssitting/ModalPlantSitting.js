import React, { useEffect, useState, useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../colors";
import { Button, Modal, TextInput } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import DropdownSelect from "react-native-input-select";
import MyContext from "../MyContext";

const ModalPlantSitting = (props) => {
  const { setVisible, visible } = props;
  const { plants, addPlantSitting } = useContext(MyContext);
  const initialState = {
    description: null,
    reason: null,
    plants: null,
    beginDate: null,
    endDate: null,
  };
  const [plantData, setPlantData] = useState(initialState);
  const [isTypeEnd, setIsTypeEnd] = useState(true);
  const minDate = new Date();

  useEffect(() => {
    if (visible) {
      setPlantData(initialState);
    }
  }, [visible]);

  const handleAddPlantSitting = () => {
    if (plantData.description === null || plantData.reason === null || plantData.plants === null || plantData.beginDate === null || plantData.endDate === null) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }
    setVisible(false);
    addPlantSitting({ ...plantData, id: Math.floor(Math.random() * 1000000), status: "En attente" });
  };


  const onDateChange = (date, type) => {
    if (type === "END_DATE" && isTypeEnd) {
      setPlantData({ ...plantData, endDate: date });
      setIsTypeEnd(false);
    } else {
      setPlantData({ ...plantData, beginDate: date });
      setIsTypeEnd(true);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <ScrollView>
        <View style={styles.modalContent}>
          <Text>Demande de plant-sitting :</Text>
          <View style={styles.modalCalendar}>
            <View style={styles.container}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                weekdays={["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
                months={[
                  "Janvier",
                  "Février",
                  "Mars",
                  "Avril",
                  "Mai",
                  "Juin",
                  "Juillet",
                  "Août",
                  "Septembre",
                  "Octobre",
                  "Novembre",
                  "Décembre",
                ]}
                previousTitle="Précédent"
                nextTitle="Suivant"
                selectedStartDate={plantData.beginDate ? plantData.beginDate : null}
                selectedEndDate={plantData.endDate ? plantData.endDate : null}
                todayBackgroundColor="#99ff99"
                selectedDayColor={colors.success}
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                width={300}
              />
            </View>
            <DropdownSelect
              placeholder="Plantes à garder"
              options={plants.map(plant => ({
                label: plant.variety,
                value: plant,
              }))}
              selectedValue={plantData.plants ? plantData.plants : null}
              onValueChange={(itemValue) => setPlantData({ ...plantData, plants: itemValue })}
              isMultiple
              isSearchable
              modalControls={{  modalOptionsContainerStyle: {paddingBottom: 20}}}
            />
            <TextInput
              label="Description de vos plantes :"
              value={plantData.description ? plantData.description : ""}
              onChangeText={description => setPlantData({ ...plantData, description })}
              multiline
            />
            <TextInput
              label="Raison de votre demande :"
              value={plantData.reason ? plantData.reason : ""}
              onChangeText={reason => setPlantData({ ...plantData, reason })}
              multiline
            />
            <Button
              onPress={() => handleAddPlantSitting()}
              buttonColor={colors.success}
              textColor={colors.black}
            >
              <Text>
                Add Plant
              </Text>
            </Button>
          </View>
          <Icon
            name="close"
            onPress={() => setVisible(false)}
            style={styles.modalCloseIcon}
            color={"#000000"}
            size={40}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.background,
    margin: 30,
    flex: 1,
    borderRadius: 10,
  },
  modalCalendar: {
    marginHorizontal: 20,
    flex: 1,
  },
  modalContent: {
    margin: 20,
    flex: 1,
    gap: 40,
  },
  modalCloseIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    color: colors.warning,
  },
});

export default ModalPlantSitting;