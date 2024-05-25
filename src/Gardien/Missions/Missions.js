import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../functions/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import MyContext from "../../Context/MyContext";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";

const Mission = () => {
  const { plantSittings, updateStatePlantSitting, addPlantSitting } = useContext(MyContext);

  const deleteMission = (plant) => {
    updateStatePlantSitting(plant.id, "slot");
    if (plant?.plant) addPlantSitting(plant.plant);
  };

  const missions = plantSittings ? plantSittings.filter(plantSitting => plantSitting.status === "mission") : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes gardes :</Text>
      <ScrollView>
        {missions && missions.map((mission, index) => (
          <CardPhotoContainer
            key={index}
            plants={mission.plants}
            pagination={mission.plants.length > 1}
            cardStyles={styles.card}
            imageCarouselStyles
            imageWidth={29}
            imageHeight={23}
          >
            <View style={styles.bottomContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail">coco</Text>
              <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => deleteMission(mission)}>
                <Icon name="delete" color={"#ff5555"} size={24} />
              </Button>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail">{mission.adress.number + " " + mission.adress.street + " " + mission.adress.city}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{mission.reason}</Text>
            <Text style={styles.text}>{format(mission.begin_date, "MM/dd/yy") + " - " + format(mission.end_date, "MM/dd/yy")}</Text>
            <Text style={[styles.text, styles.text2]}>{mission.status}</Text>
          </CardPhotoContainer>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginBottom: 50,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 40,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteButton: {
    position: "absolute",
    width: "100%",
    alignItems: "flex-end",
    left: "12%",
  },
  text: {
    textAlign: "center",
  },
  text2: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Mission;
