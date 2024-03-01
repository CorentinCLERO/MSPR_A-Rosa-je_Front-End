import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../colors';
import moment from 'moment';

const Plantsitting = (props) => {
  const { plantSittingList } = props;
  const PlantSittingWaiting = plantSittingList.filter(plantSitting => plantSitting.status === 'En attente');
  const PlantSittingKeep = plantSittingList.filter(plantSitting => plantSitting.status === 'En cours');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Demandes de Plant-Sitting</Text>
      <Text style={styles.titlePlant}>Vos Plant-Sitting en cours :</Text>
      <ScrollView style={styles.containerPlant}>
        {PlantSittingWaiting.map(plantSitting => (
          <Card key={plantSitting.id} style={styles.card}>
            <View style={styles.cardLayout}>
              <Card.Cover style={styles.cardImage} source={{ uri: plantSitting.plants[0]?.url }} />
              <Card.Content style={styles.cardContent}>
                <Text>{plantSitting.reason}</Text>
                <Text>{plantSitting.description}</Text>
                <Text>{plantSitting.plants.length + ' plantes'}</Text>
                <Text>{moment(plantSitting.beginDate).format('l') + ' - ' + moment(plantSitting.endDate).format('l')}</Text>
                <Text>{plantSitting.status}</Text>
              </Card.Content>
            </View>
          </Card>
        ))}
      </ScrollView>
      <Text style={[styles.titlePlant, styles.titlePlant2]}>Vos demandes de Plant-Sitting :</Text>
      <ScrollView style={styles.containerPlant}>
        {PlantSittingKeep.map(plantSitting => (
          <Card key={plantSitting.id} style={styles.card}>
            <View style={styles.cardLayout}>
              <Card.Cover style={styles.cardImage} source={{ uri: plantSitting.plants[0]?.url }} />
              <Card.Content style={styles.cardContent}>
                <Text>{plantSitting.reason}</Text>
                <Text>{plantSitting.description}</Text>
                <Text>{plantSitting.plants.length + ' plantes'}</Text>
                <Text>{moment(plantSitting.beginDate).format('l') + ' - ' + moment(plantSitting.endDate).format('l')}</Text>
                <Text>{plantSitting.status}</Text>
              </Card.Content>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    margin: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  containerPlant: {
    paddingHorizontal: 20,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titlePlant: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titlePlant2: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  cardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    // Ombre pour iOS
    shadowColor: colors.success,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 15,
  },
  cardImage: {
    flex: 4,
    height: 150,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 10,
  },
});

export default Plantsitting;