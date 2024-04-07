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
  const { plants, addPlantSitting, addresses } = useContext(MyContext);
  const [plantData, setPlantData] = useState([]);
  const [isTypeEnd, setIsTypeEnd] = useState(true);
  const minDate = new Date();

  useEffect(() => {
    if (visible) {
      setPlantData([]);
    }
  }, [visible]);
  
  const handleAddPlantSitting = () => {
    if (plantData.description === undefined || plantData.reason === undefined || plantData.plants === undefined || plantData.begin_date === undefined || plantData.end_date === undefined || plantData.adress === undefined) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }
    // setVisible(false);
    addPlantSitting({ ...plantData, id: Math.floor(Math.random() * 1000000), status: "slot" });
  };


  const onDateChange = (date, type) => {
    if (type === "END_DATE" && isTypeEnd) {
      setPlantData({ ...plantData, end_date: date });
      setIsTypeEnd(false);
    } else {
      setPlantData({ ...plantData, begin_date: date });
      setIsTypeEnd(true);
    }
  };

  const plantsWithNoPkantSitting = plants.filter(plant => plant.request_id === null);

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
                selectedStartDate={plantData.begin_date ? plantData.begin_date : null}
                selectedEndDate={plantData.end_date ? plantData.end_date : null}
                todayBackgroundColor="#99ff99"
                selectedDayColor={colors.success}
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                width={300}
              />
            </View>
            <DropdownSelect
              placeholder="Plantes à garder"
              options={plantsWithNoPkantSitting.map(plant => ({
                label: plant.variety,
                value: plant,
              }))}
              selectedValue={plantData.plants ? plantData.plants : null}
              onValueChange={(itemValue) => setPlantData({ ...plantData, plants: itemValue })}
              isMultiple
              isSearchable
              modalControls={{  modalOptionsContainerStyle: {paddingBottom: 20}}}
            />
            <DropdownSelect
              placeholder="Adresse des plantes"
              options={addresses.map(adress => ({
                label: adress.number + " " + adress.street + " " + adress.city,
                value: adress,
              }))}
              selectedValue={plantData.adress ? plantData.adress : null}
              onValueChange={(itemValue) => setPlantData({ ...plantData, adress: itemValue })}
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