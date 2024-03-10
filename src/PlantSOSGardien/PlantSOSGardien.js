import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const PlantSOSGardien = () => {
  const [plantData, setPlantData] = useState({});

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center", marginVertical: 20 }}>PlantSOS</Text>
      <View>
        <Text></Text>
        <Text></Text>
        <TextInput
          label=""
          value={plantData.title ? plantData.title : ""}
          onChangeText={title => setPlantData({ ...plantData, title })}
        />
        <Text></Text>
        <TextInput
          label=""
          value={plantData.description ? plantData.description : ""}
          onChangeText={description => setPlantData({ ...plantData, description })}
          multiline
        />
      </View>
    </View>
  );
};

export default PlantSOSGardien;