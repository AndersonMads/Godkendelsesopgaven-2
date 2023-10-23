import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue } from "firebase/database";

 function Hello() { // Her skal vi kunne se de restauranter som brugeren har liket. Skal implementeres.
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Display liked restaurants</Text>
            
            <Text style={styles.text}>Book a table</Text>
        </View>
    );
}


export default Hello

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