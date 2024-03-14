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
        style={styles.search}
      />

      <FlatList
        
        data={filteredPlants}
        renderItem={({ item }) => (
          
          
          <Card  style={styles.card} key={item.index} onPress={() => setVisible(true)}>
            <Card.Cover style={styles.cover} source={{ uri: item.url}}/>
            <Card.Content style={styles.content} >
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
    position : "relative",
    left : 142 ,
    marginBottom : 20 ,
    fontSize : 27 , 
    fontWeight : "bold"
  },
  search : {
    position : "relative",
    left : 20 , 
    width : 370,
    marginBottom : 20 ,
  },
  card : {
    display : "flex",
    flexWrap : "wrap" , 
    marginBottom: 20,
    width : 375 ,
    position : "relative",
    left : 15, 
  },
  cover : {
    height : 150,
    width : 125
  },
  content : {
    position : "absolute",
    marginTop : 15 , 
    left : 120,
    width : 250 
  }
  


});

export default PlantSOS;