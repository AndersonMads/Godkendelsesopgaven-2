import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
    Alert
} from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import RatingFilterButton from '../Filter';


function RestaurantList({navigation}){

    const [restaurants,setRestaurants] = useState()
    const [selectedRating, setSelectedRating] = useState('all');

    // Vi bruger useEffect til at hente data fra firebase, når komponenten mounter
    useEffect(() => {
        const db = getDatabase();
        const restaurantRef = ref(db, "Restaurant");
    
        // Vi bruger en event listener til at lytte på ændringer i vores data
        onValue(restaurantRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null && data !== undefined) {
                
                setRestaurants(data);
            } else {
                // Hvis der ikke er nogen data, så sætter vi vores state til et tomt array
                setRestaurants([]);
            }
        });
    
        
        return () => {

            off(restaurantRef);
        };
    }, []); 


     // Handle rating filter change
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

    // Vis brugeren at der ikke er tilføjet nogle restauranter endnu, hvis der ikke er nogle i databasen
    if (!restaurants) {
        return Alert.alert("På nuværende tidspunkt er der ingen restauranter");
    }

    const handleSelectRestaurant = id => {
        // Vi finder den specifikke restaurant ud fra det ID vi får med fra FlatList
        const restaurant = Object.entries(restaurants).find( restaurant => restaurant[0] === id /*id*/)
        navigation.navigate('Restaurant Details', { restaurant });
    };
    
    // Vi bruger Object.values til at lave vores restaurant objekt om til et array, så vi kan loope igennem det
    const RestaurantArray = Object.values(restaurants);
    const RestaurantKeys = Object.keys(restaurants);

    return (
        <View>
          {/* Rating Filter Buttons */}
          <View style={styles.filterContainer}>
            <RatingFilterButton
              rating="all"
              isSelected={selectedRating === 'all'}
              onPress={() => handleRatingChange('all')}
            />
            <RatingFilterButton
              rating="1"
              isSelected={selectedRating === '1'}
              onPress={() => handleRatingChange('1')}
            />
            {/* Add more RatingFilterButton components for other ratings */}
          </View>
    
          {/* Restaurant List */}
          <FlatList
            data={RestaurantArray}
            keyExtractor={(item, index) => RestaurantKeys[index]}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={styles.container} onPress={() => handleSelectRestaurant(RestaurantKeys[index])}>
                  <Text>
                    Name: {item.Name}{"\n"}
                    Location: {item.Location}{"\n"}
                    Rating: {item.Rating}{"\n"}
                    Cuisine: {item.Cuisine}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    }


export default RestaurantList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5', // Light gray background
      borderWidth: 1,
      borderRadius: 15,
      margin: 10,
      padding: 10,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black', // Add shadow for depth
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5, // For Android shadow
    },
    text: {
      fontWeight: 'bold',
      fontSize: 18, // Increased font size
      color: '#333', // Dark text color
      textAlign: 'center',
    },
    flatList: {
      padding: 16,
    },
  });
  
  
  