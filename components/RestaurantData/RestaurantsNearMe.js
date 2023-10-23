import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location"; // Importerer de forskellige komponenter vi skal bruge. Specielt location, som vi bruger til at finde vores nuværende lokation
import MapView, { Marker } from "react-native-maps";


const NearMe = () => {
  const [currentLocation, setCurrentLocation] = useState(null); // Sætter vores inital state til null, da vi ikke har nogen lokation endnu
  const [initialRegion, setInitialRegion] = useState(null); // Sætter vores initial region til null, da vi ikke har nogen lokation endnu

  useEffect(() => {
    const getLocation = async () => { // Her opretter vi en async funktion, som vi bruger til at finde vores nuværende lokation
      let { status } = await Location.requestForegroundPermissionsAsync(); // Her spørger vi om lov til at bruge brugerens lokation
      if (status !== "granted") { // Hvis brugeren ikke giver lov, så returner vi nedenstående
        console.log("Ingen adgang til lokation");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords); // Her sætter vi vores nuværende lokation til vores currentLocation state

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  
  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude, // Her sætter vi en marker på vores nuværende lokation
                longitude: currentLocation.longitude, 
              }}
              title="Din Lokation"
            />
          )}
            <Marker // Laver en marker til den restaurant der findes i Databasen

                coordinate={{ // Bemærk at denne er hardcoded ind, man bør i stedet hente koordinaterne fra databasen fremover
                latitude: 55.665782195963324,
                longitude: 12.537008082740034,
                }}
                title="Aamans"
                description="Smørrebrød"
                pinColor="black"
            />
     
          
        </MapView>
      )}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default NearMe;