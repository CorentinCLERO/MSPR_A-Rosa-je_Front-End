import React, { useEffect, useState } from "react";
import { Text , StyleSheet, View, FlatList} from "react-native";
import { Card , Searchbar} from "react-native-paper";
import ModalSOS from "./ModalSOS";

const PlantSOS = (props) => {
  const {plantSOSListe } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const filteredPlants = plantSOSListe.filter(plantSOS =>
      plantSOS.variety.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filteredPlants);
  }, [searchQuery, plantSOSListe]);

  return (
    <View>

      <Text style={styles.header}>PlantSOS</Text>
      <Searchbar
        placeholder="Rechercher une plante"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredPlants}
        renderItem={({ item }) => (
          
          
          <Card key={item.index} onPress={() => setVisible(true)}>
            <Card.Cover source={{ uri: item.url}}/>
            <Card.Content >
              <Text>{item.variety}</Text>
              <Text>{item.description}</Text>
                 
              <Text>{item.treated ? "En cours" : "Terminer"}</Text>
                  
            </Card.Content>
            
          </Card>
           
         
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      
      <ModalSOS {...props} {...{ setVisible, visible }} />
    </View>
    

  );
};


const styles = StyleSheet.create({
  header : {
    fontSize : 20 , 
    fontWeight : "bold"
  }

});

export default PlantSOS;