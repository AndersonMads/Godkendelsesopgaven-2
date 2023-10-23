import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue } from "firebase/database";

 function Profile() { // Her skal brugeren logge ind som enten bruger eller restaurant. 
    // Afhængig af hvad man logger ind som, skal man kunne se bookninger fra brugere eller se hvilke brugere der har liket ens restaurant.
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login as Restaurant</Text>
            
            <Text style={styles.text}>Login as User</Text>
        </View>
    );
}


export default Profile

//Lokal styling til brug i HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});