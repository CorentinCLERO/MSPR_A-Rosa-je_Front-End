import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, FlatList, Text } from "react-native";
import { Card } from "react-native-paper";
import { vw, vh } from "react-native-expo-viewport-units";
import { colors } from "../../functions/colors";

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
    imageHeight = 19,
    imageWidth = 27,
    pagination = false,
    onPress = () => {}
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % plants?.length;

    if (nextIndex >= 0 && nextIndex < plants?.length) {
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
  // console.log("plants", plants)
  return (
    <Card style={[styles.card, cardStyles]} onPress={() => onPress()}>
      <View style={[styles.cardLayout, cardLayoutStyles]}>
        <FlatList
          data={plants}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          renderItem={({ item, index }) => (
            <View>
              <Image source={{ uri: item?.url || item?.picture?.url || "https://res.cloudinary.com/dl0ehqnva/image/upload/v1710676939/msprb3cda/h36vzpfnuwwmrgvjgveh.png" }} style={[styles.carouselImage, { width: vw(imageWidth), height: vh(imageHeight) }, carouselImageStyles]} />
              <Text style={[styles.carouselPagination, carouselPaginationStyles, pagination ? {} : styles.displayNone]}>{index + 1}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={[styles.imageCarousel, { height: vh(imageHeight) }, imageCarouselStyles]}
          ref={flatListRef}
          
        />
        <Card.Content style={[styles.cardContent, cardContentStyles]}>
          <View style={styles.cardContentCenter}>
            {children}
          </View>
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
    borderRadius: 10,
    // Ombre pour iOS
    shadowColor: colors.blue,
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
    bottom: 10,
    right: 10,
    backgroundColor: colors.white + "99",
    paddingHorizontal: 5,
    borderRadius: 7
  },
  cardContent: {
    flex: 6,
    backgroundColor: colors.green,
    height: "100%",
    borderLeftWidth: 1,
  },
  cardContentCenter: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    gap: 10,
  },
  displayNone: {
    display: "none",
  },
});

export default CardPhotoContainer;