import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Button, Card } from "react-native-paper";
import { colors } from "../colors";
import { format } from "date-fns";
import * as Location from "expo-location";
import MapsPinSVG from "../../assets/iconesTabs/mapsPin.svg";
import MyContext from "../MyContext";
import CardPhotoContainer from "../components/CardPhotoContainer/CardPhotoContainer";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [transportability, setTransportability] = useState(null);
  const { updateStatePlantSitting, plantSittings } = useContext(MyContext);
  const mapViewRef = useRef(null);
  const plantSittingRequests = plantSittings.filter((plant) => plant.status === "En attente");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      mapViewRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 350);
    })();
  }, [updateStatePlantSitting]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    const movableRatio = marker?.plants?.filter(plant => plant?.movable).length / marker?.plants?.length;

    if (movableRatio === 1) {
      setTransportability(marker?.plants?.length > 1 ? "Transportables" : "Transportable");
    } else if (movableRatio === 0) {
      setTransportability(marker?.plants?.length > 1 ? "Non transportables" : "Non transportable");
    } else {
      setTransportability(`Transportables à (${Math.round(movableRatio * 100)}%)`);
    }

    const region = {
      latitude: marker.adress.latitude,
      longitude: marker.adress.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    mapViewRef.current?.animateToRegion(region, 350);
  };

  const handleKeppPlant = (plant) => {
    updateStatePlantSitting(plant.id, "En cours");
    setSelectedMarker(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between", }}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>Recherchez les plantes à garder prez de chez vous :</Text>
        <MapView ref={mapViewRef} style={{ width: vw(100), height: selectedMarker ? vh(50) : vh(70) }}>
          {userLocation && (
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Votre position"
            />
          )}
          {plantSittingRequests?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.adress.latitude, longitude: marker.adress.longitude }}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50 }}>
                <MapsPinSVG width="100%" height="100%" />
              </View>
            </Marker>
          ))}
        </MapView>
        {selectedMarker &&
          <CardPhotoContainer
            plants={selectedMarker.plants}
            pagination={selectedMarker.plants.length > 1}
            imageWidth={29}
          >
            <Text style={{ paddingTop: 5 }} >{selectedMarker?.plants?.length + " plantes"}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{transportability}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{format(selectedMarker?.beginDate, "dd/MM/yy") + " - " + format(selectedMarker.endDate, "dd/MM/yy")}</Text>
            <Button style={styles.keepButton} rippleColor={"green"} onPress={() => handleKeppPlant(selectedMarker)}>
              <Text style={{ color: "black" }}>{selectedMarker?.plants?.length > 1 ? "Garder la plante" : "Garder les plantes"}</Text>
            </Button>
          </CardPhotoContainer>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  keepButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

export default Map;