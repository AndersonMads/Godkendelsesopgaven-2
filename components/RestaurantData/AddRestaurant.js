import * as React from 'react'; // Importer React
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
// Importer de hooks vi skal bruge
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';

import { getDatabase, ref, child, push, update  } from "firebase/database"; // Importer de funktioner vi skal bruge fra firebase
import { getStorage, uploadString, getDownloadURL } from 'firebase/storage';


function AddRestaurant({navigation,route}){ // Her opretter vi vores AddRestaurant funktion, som vi eksporterer til App.js
   
    const db = getDatabase(); // Her henter vi vores database

    const initialState = { // Her opretter vi vores initial state, som vi bruger til at oprette en ny restaurant
        Name: '',
        Location: '',
        Rating: '',
        Cuisine: ''
    }

    const [newRestaurant,setNewRestaurant] = useState(initialState); // Her opretter vi vores state, som vi bruger til at oprette en ny restaurant
    const [image, setImage] = useState(null);
    const pickImage = async () => { // Dette er vores pickImage funktion, som vi bruger til at vælge et billede fra vores galleri. 
        // På nuværende tidspunkt er det ikke implementeret, at billedet bliver gemt i databasen
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    }


    // Hvis vi er inde på edit restaurant, så skal vi hente restauranten fra route params og sætte den i state
    const isEditRestaurant = route.name === "Edit Restaurant";

    useEffect(() => {
        if(isEditRestaurant){
            const restaurant = route.params.restaurant[1];
            setNewRestaurant(restaurant)
        }
        return () => {
            setNewRestaurant(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => { // Her opretter vi vores changeTextInput funktion, som vi bruger til at ændre vores state
        setNewRestaurant({...newRestaurant, [name]: event});
    }

    const handleSave = async () => { // Her opretter vi vores handleSave funktion, som vi bruger til at gemme vores state i databasen

        const { Name, Location, Rating, Cuisine } = newRestaurant;

        if(Name.length === 0 || Location.length === 0 || Rating.length === 0 || Cuisine.length === 0 ){
            return Alert.alert('Udfyld venligst felterne');
        }

        if(isEditRestaurant){ // Hvis vi er inde på edit restaurant, så skal vi opdatere restauranten i stedet for at oprette en ny
            const id = route.params.restaurant[0];
            // Definer path til den specifikke restaurant
            const RestaurantRef = ref(db, `Restaurant/${id}`);

            // Definer de felter vi vil opdatere
            const updatedFields = {
                Name,
                Location,
                Rating,
                Cuisine,
                ImageUrl: imageUrl
            };
            
            // Her laver vi en asynkron funktion, som opdaterer vores restaurant i databasen
            await update(RestaurantRef, updatedFields)
                .then(() => {
                Alert.alert("Din info er nu opdateret");
                const restaurant = newRestaurant;
                navigation.navigate("Restaurant Details", { restaurant });
                })
                .catch((error) => {
                console.error(`Error: ${error.message}`);
                });

        }else{
        // Dette else statement bruges til at oprette en ny restaurant i databasen
        const RestaurantRef = ref(db, "/Restaurant/");
        
        // newRestaurantData er de felter vi vil oprette
        const newRestaurantData = {
            Name,
            Location,
            Rating,
            Cuisine
        };
        
        // Her laver vi en asynkron funktion, som opretter vores restaurant i databasen
        await push(RestaurantRef, newRestaurantData)
            .then(() => {
            Alert.alert("Oprettet");
            setNewRestaurant(initialState);
            })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
            });}};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return( // Her laver vi en TextInput for hvert key i vores initialState
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newRestaurant[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                         
                            
                        )
                        
                    })
                }
                {}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Choose a picture" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </View>
                <Button title={ isEditRestaurant ? "Save changes" : "Add restaurant"} onPress={() => handleSave()} />
                
            </ScrollView>
        </SafeAreaView>
    );
    
}


export default AddRestaurant; // Eksporter vores AddRestaurant funktion, så vi kan bruge den i App.js

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    label: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
    },
    input: {
      flex: 2,
      borderWidth: 1,
      borderRadius: 4,
      padding: 8,
      fontSize: 16,
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 16,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    },
  });