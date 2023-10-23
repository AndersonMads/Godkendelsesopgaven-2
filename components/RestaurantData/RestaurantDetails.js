import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove } from "firebase/database";

function RestaurantDetails ({route,navigation}){
    const [restaurant,setRestaurant] = useState({});

    useEffect(() => {
        // Vi henter restauranten fra route params og sætter den i state
        setRestaurant(route.params.restaurant[1]);

        return () => {
            setRestaurant({})
        }
    });

    const handleEdit = () => {
        // Hvis vi er inde på edit restaurant, så skal vi hente restauranten fra route params og sende den med som parameter
        const restaurant = route.params.restaurant
        navigation.navigate('Edit Restaurant', { restaurant });
    };


    const handleDelete = async () => {
        const id = route.params.restaurant[0];
        const db = getDatabase();
        // Her opretter vi en reference til den specifikke restaurant vi vil slette
        const RestaurantRef = ref(db, `Restaurant/${id}`);
        
     
       await remove(RestaurantRef)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    if (!restaurant) {
        return <Text>No data</Text>;
    }

    // Vi bruger Object.entries til at lave vores restaurant objekt om til et array, så vi kan loope igennem det
    return (
        <View style={{ ...styles.container,  marginTop: 50 }}>

            {
                Object.entries(restaurant).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                    
                })
                
            }
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => handleDelete()} />
            <Button title="Like"/>
            <Button title="Write to restaurant" onPress={() => navigation.navigate('Chat')} />
        </View>
    );
}

export default RestaurantDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});