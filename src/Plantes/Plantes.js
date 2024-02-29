import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, Card, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../colors';
import ModalAddPlant from './ModalAddPlant';

const Plantes = ({ plantList, deletePlant, addPlant }) => {
  const [canScroll, setCanScroll] = useState(false);
  const [haveScroll, setHaveScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const scrollViewRef = useRef(null);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const scrollViewHeight = Dimensions.get('window').height - 40;
    if (contentHeight > scrollViewHeight) {
      setCanScroll(true);
    } else {
      setCanScroll(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos plantes :</Text>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(w, h) => handleContentSizeChange(w, h)}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y) {
            setHaveScroll(true);
          } else {
            setHaveScroll(false);
          }
        }}
      >
        {
          plantList.map((plant, index) => {
            return (
              <Card
                key={`${plant.name}-${index}`}
                style={[
                  styles.card,
                  index === plantList.length - 1 ? styles.lastCard : {}
                ]}              >
                <View style={styles.cardLayout}>
                  <Card.Cover style={styles.cardImage} source={{ uri: plant.url }} />
                  <Card.Content style={styles.cardContent}>
                    <Text style={styles.cardtitle}>{plant.variety}</Text>
                    <Text style={styles.content}>{plant.movable ? 'Déplaçable' : 'Non déplaçable'}</Text>
                    <Button style={styles.deleteButton} rippleColor={'#f00'} onPress={() => deletePlant(plant.id)}>
                      <Icon name="delete" color={'#ff5555'} size={24} />
                    </Button>
                  </Card.Content>
                </View>
              </Card>
            );
          })
        }
      </ScrollView>
      {canScroll && (
        <Icon
          name={haveScroll ? 'arrow-up' : 'arrow-down'}
          size={24}
          color="#000"
          style={styles.scrollIcon}
          onPress={() => {
            if (haveScroll) scrollViewRef.current.scrollTo({ animated: true });
            else scrollViewRef.current.scrollToEnd({ animated: true });
          }} />
      )}
      <Button style={styles.addButton} mode="contained" onPress={() => setVisible(true)} buttonColor='#D9D9D9' rippleColor={'#00000040'}>
        <Icon name="plus" color={'#000000'} size={24} />
      </Button>
      <ModalAddPlant {...{ setVisible, visible }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 26,
  },
  lastCard: {
    marginBottom: 100,
  },
  cardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    flex: 4,
    height: 150,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 10,
  },
  cardtitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
  },
  deleteButton: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  scrollIcon: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 10,
  },
  addButton: {
    width: 80,
    position: 'absolute',
    bottom: 20,
    right: '50%',
    transform: [{ translateX: 20 }],
  },
});

export default Plantes;
