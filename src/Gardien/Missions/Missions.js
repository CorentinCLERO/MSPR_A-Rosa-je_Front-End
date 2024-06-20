import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../functions/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import MyContext from "../../Context/MyContext";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";
import Chat from "../../Chat/Chat";

const Mission = () => {
  const { plantSittings, updateStatePlantSitting, user } = useContext(MyContext);
  const [userSelected, setUserSelected] = useState("");

  const deleteMission = (plant) => {
    updateStatePlantSitting(plant.id, "slot");
  };

  const missions = plantSittings ? plantSittings.filter(plantSitting => plantSitting.status === "mission" && plantSitting.guard_id === user.id) : [];

  return (
    <View style={styles.container}>
      {userSelected ? <Chat {...{ userSelected, setUserSelected }} /> :
        <>
          <Text style={styles.title}>Mes gardes :</Text><ScrollView>
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
                  <Text numberOfLines={1} ellipsizeMode="tail">{mission?.user?.pseudo}</Text>
                  <Button style={styles.chatButton} rippleColor={"#777"} onPress={() => setUserSelected(mission.user)}>
                    <Icon name="chat" color={"#fff"} size={24} />
                  </Button>
                  <Button style={styles.cameraButton} rippleColor={"#777"} onPress={() => { }}>
                    <Icon name="camera" color={"#fff"} size={24} />
                  </Button>
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail">{mission.adress.number + " " + mission.adress.street + " " + mission.adress.city}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">{mission.reason}</Text>
                <Text style={styles.text}>{format(mission.begin_date, "dd/MM/yy") + " - " + format(mission.end_date, "dd/MM/yy")}</Text>
                <View>
                  <Text style={[styles.text, styles.text2]}>{mission.status}</Text>
                  <Button style={styles.deleteButton} rippleColor={"#f00"} onPress={() => deleteMission(mission)}>
                    <Icon name="delete" color={"#ff5555"} size={24} />
                  </Button>
                </View>
              </CardPhotoContainer>
            ))}
          </ScrollView></>}
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
  },
  chatButton: {
    position: "absolute",
    left: "70%",
  },
  cameraButton: {
    position: "absolute",
    left: "40%",
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
    marginRight: 50,
  },
});

export default Mission;
