import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../functions/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import ModalPlantSitting from "./ModalPlantSitting";
import MyContext from "../../Context/MyContext";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";

const Plantsitting = () => {
  const { plantSittings, removePlantSitting } = useContext(MyContext);
  console.log(plantSittings);

  const [visible, setVisible] = useState(false);
  const PlantSittingWaiting = plantSittings ? plantSittings?.filter(plantSitting => plantSitting.status === "mission") : [] ?? [];
  const PlantSittingKeep = plantSittings ? plantSittings?.filter(plantSitting => plantSitting.status === "slot") : [] ?? [];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Demandes de Plant-Sitting</Text>
      <View style={styles.containerPlant}>
        <Text style={styles.titlePlant}>Vos Plant-Sitting mission :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingWaiting && PlantSittingWaiting?.map((plantSitting, index) => (
            <CardPhotoContainer
              key={index} 
              plants={plantSitting?.plants?.length > 0 ? plantSitting?.plants : ["https://res.cloudinary.com/dl0ehqnva/image/upload/v1710676939/msprb3cda/h36vzpfnuwwmrgvjgveh.png"]}
              cardStyles={index === PlantSittingWaiting?.length - 1 ? styles.lastCard : {}}
              pagination={plantSitting?.plants?.length > 1}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting?.reason}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting?.description}</Text>
              <Text style={styles.text}>{plantSitting?.plants?.length ? plantSitting?.plants?.length : "Aucune"} plantes</Text>
              <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                {plantSitting?.begin_date ? format(new Date(plantSitting?.begin_date), "dd/MM/yy") : "Date non renseignée"}
                {" - "}
                {plantSitting?.end_date ? format(new Date(plantSitting?.end_date), "dd/MM/yy") : "Date non renseignée"}
              </Text>
              <View style={styles.bottomContainer}>
                <Text style={[styles.text, styles.text2]}>{plantSitting?.status}</Text>
                <Button
                  style={styles.deleteButton}
                  rippleColor={"#f00"}
                  onPress={() => removePlantSitting(plantSitting?.id)}
                >
                  <Icon name="delete" color={"#ff5555"} size={24} />
                </Button>
              </View>
            </CardPhotoContainer>
          ))}

        </ScrollView>
      </View>
      <View style={styles.containerPlant}>
        <Text style={[styles.titlePlant, styles.titlePlant2]}>Vos demandes de Plant-Sitting :</Text>
        <ScrollView style={styles.containerPlantScroll}>
          {PlantSittingKeep && PlantSittingKeep?.map((plantSitting, index) => (
            <CardPhotoContainer
              key={index}
              plants={plantSitting?.plants?.length > 0 ? plantSitting?.plants : ["https://res.cloudinary.com/dl0ehqnva/image/upload/v1710676939/msprb3cda/h36vzpfnuwwmrgvjgveh.png"]}
              cardStyles={index === PlantSittingKeep?.length - 1 ? styles.lastCard2 : {}}
              pagination={plantSitting?.plants?.length > 1}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting?.reason}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">{plantSitting?.description}</Text>
              <Text style={styles.text}>{plantSitting?.plants?.length ? plantSitting?.plants?.length : "Aucune"} plantes</Text>
              <Text style={styles.text}>
                {plantSitting?.begin_date ? format(new Date(plantSitting?.begin_date), "dd/MM/yy") : "Date non renseignée"}
                {" - "}
                {plantSitting?.end_date ? format(new Date(plantSitting?.end_date), "dd/MM/yy") : "Date non renseignée"}
              </Text>
              <View style={styles.bottomContainer}>
                <Text style={[styles.text, styles.text2]}>{plantSitting?.status}</Text>
                <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => removePlantSitting(plantSitting?.id)}>
                  <Icon name="delete" color={"#ff5555"} size={24} />
                </Button>
              </View>
            </CardPhotoContainer>
          ))}
        </ScrollView>
        <Button
          style={styles.addButton}
          mode="contained"
          onPress={() => setVisible(true)}
          buttonColor="#D9D9D9"
          rippleColor={"#00000040"}
        >
          <Icon name="plus" color={"#000000"} size={24} />
        </Button>
      </View>
      <ModalPlantSitting {...{ setVisible, visible }} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    margin: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  containerPlant: {
    height: "50%",
  },
  containerPlantScroll: {
    paddingHorizontal: 10,
  },
  lastCard: {
    marginBottom: 20,
  },
  lastCard2: {
    marginBottom: 130,
  },
  titlePlant: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  titlePlant2: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -10,
  },
  deleteButton: {
    width: "100%",
    alignItems: "center",
    marginLeft: -10,
  },
  text: {
    textAlign: "center"
  },
  text2: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: -10,
    borderRadius: 10,
  },
  addButton: {
    width: 80,
    position: "absolute",
    bottom: 60,
    right: "50%",
    transform: [{ translateX: 40 }],
    borderWidth: 1,
    borderColor: colors.black,
  },
});

export default Plantsitting;