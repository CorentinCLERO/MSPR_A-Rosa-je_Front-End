import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, FlatList, Text } from "react-native";
import { Card } from "react-native-paper";
import { vw, vh } from "react-native-expo-viewport-units";
import { colors } from "../../colors";

const CardPhotoContainer = (props) => {
  const { 
    children, 
    plants, 
    cardStyles = {}, 
    cardLayoutStyles = {}, 
    cardContentStyles = {}, 
    imageCarouselStyles = {},
    carouselImageStyles = {},
    carouselPaginationStyles = {},
    imageHeight = 17,
    imageWidth = 27,
    pagination = false
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % plants.length;

    if (nextIndex >= 0 && nextIndex < plants.length) {
      const nextItemOffset = vw(imageWidth) * nextIndex;
      flatListRef?.current?.scrollToOffset({
        animated: true,
        offset: nextItemOffset,
      });
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, 4000);
  
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Card style={[styles.card, cardStyles]}>
      <View style={[styles.cardLayout, cardLayoutStyles]}>
        <FlatList
          data={plants}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          renderItem={({ item, index }) => (
            <View>
              <Image source={{ uri: item.url }} style={[styles.carouselImage, { width: vw(imageWidth), height: vh(imageHeight) }, carouselImageStyles]} />
              <Text style={[styles.carouselPagination, carouselPaginationStyles, pagination ? {} : styles.displayNone]}>{index + 1}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={[styles.imageCarousel, {height: vh(imageHeight)}, imageCarouselStyles]}
          ref={flatListRef}
        />
        <Card.Content style={[styles.cardContent, cardContentStyles]}>
          {children}
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
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
    elevation: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageCarousel: {
    width: vw(20),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  carouselImage: {
    resizeMode: "cover",
  },
  carouselPagination: { 
    color: colors.success, 
    position: "absolute", 
    bottom: 10 , 
    right: 10, 
    backgroundColor: colors.white + "99", 
    paddingHorizontal: 5, 
    borderRadius: 7 
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 10,
  },
  displayNone: {
    display: "none",
  },
});

export default CardPhotoContainer;