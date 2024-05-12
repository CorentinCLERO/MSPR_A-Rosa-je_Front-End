import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { vw, vh } from "react-native-expo-viewport-units";
import { Button } from "react-native-paper";
import { colors } from "../../functions/colors";
import { format } from "date-fns";
import * as Location from "expo-location";
import MapsPinSVG from "../../../assets/mapsPin.svg";
import MyContext from "../../Context/MyContext";
import CardPhotoContainer from "../../components/CardPhotoContainer/CardPhotoContainer";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [transportability, setTransportability] = useState(null);
  const { updateStatePlantSitting, plantSittings } = useContext(MyContext);
  const mapViewRef = useRef(null);
  const plantSittingRequests = plantSittings ? plantSittings.filter((plant) => plant.status === "slot"): [];

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
    const movableRatio = marker && marker.plants ? marker?.plants?.filter(plant => plant?.movable).length / marker?.plants?.length : [];

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
    updateStatePlantSitting(plant.id, "mission");
    setSelectedMarker(null);
  };

  return (
    <View style={styles.containerMap}>
      <ScrollView>
        <Text style={styles.title}>Recherchez les plantes à garder prez de chez vous :</Text>
        <MapView ref={mapViewRef} style={{ width: vw(100), height: selectedMarker ? vh(60) : vh(80) }}>
          {userLocation && (
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="Votre position"
            />
          )}
          {plantSittingRequests && plantSittingRequests?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.adress.latitude, longitude: marker.adress.longitude }}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
            >
              <View style={styles.mapPin}>
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
            <Text style={styles.padding5} >{selectedMarker?.plants?.length + " plantes"}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{transportability}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">{format(selectedMarker?.begin_date, "dd/MM/yy") + " - " + format(selectedMarker.end_date, "dd/MM/yy")}</Text>
            <Button style={styles.keepButton} rippleColor={"green"} onPress={() => handleKeppPlant(selectedMarker)}>
              <Text style={styles.colorBlack}>{selectedMarker?.plants?.length > 1 ? "Garder la plante" : "Garder les plantes"}</Text>
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
  colorBlack: {
    color: colors.black
  },
  padding5: {
    padding: 5
  },
  mapPin: { 
    alignItems: "center", 
    justifyContent: "center", 
    width: 50, 
    height: 50 
  },
  containerMap: { 
    justifyContent: "space-between", 
    backgroundColor: colors.background, 
    height: "100%" 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    margin: 20 
  }
});

export default Map;