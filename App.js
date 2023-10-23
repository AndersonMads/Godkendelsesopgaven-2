// Importerer først og fremmest alle react komponenter vi skal bruge
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AddRestaurant from './components/RestaurantData/AddRestaurant';
import RestaurantDetails from './components/RestaurantData/RestaurantDetails';
import RestaurantList from './components/RestaurantData/RestaurantList';
import Profile from './components/Profile';
import Hello from './components/RestaurantData/LikedRestaurant';
import Ionicons from "react-native-vector-icons/Ionicons";
import NearMe from './components/RestaurantData/RestaurantsNearMe';
import Chat from './components/RestaurantData/RestaurantChat';

export default function App() {
  // Definerer vores firebase config, med vores database url. 
  const firebaseConfig = {
    apiKey: "AIzaSyCfKNRRHmT2tpz3hT3jUVf7rTPubMYZHh4",
    authDomain: "mads-5a31c.firebaseapp.com",
    databaseURL: "https://mads-5a31c-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "mads-5a31c",
    storageBucket: "mads-5a31c.appspot.com",
    messagingSenderId: "903210097553",
    appId: "1:903210097553:web:3bb9b247bc9b27e9f09830"
  };
  initializeApp(firebaseConfig); // Her initialiserer vi vores firebase app med vores config, der bla. indeholder vores database url
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Restaurant List'} component={RestaurantList}/>
          <Stack.Screen name={'Restaurant Details'} component={RestaurantDetails}/>
          <Stack.Screen name={'Edit Restaurant'} component={AddRestaurant}/>
        </Stack.Navigator>
    )
  }

  return ( // Her opretter vi vores navigation, som vi bruger til at navigere rundt i vores app
  // Vi bruger ionicons til at oprette vores navigation icons.
    <NavigationContainer>
      <Tab.Navigator> 
        <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
        <Tab.Screen name={'Add Restaurant'} component={AddRestaurant} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
        <Tab.Screen name={'Profile'} component={Profile} options={{tabBarIcon: () => ( <Ionicons name="person-circle-outline" size={20} />)}}/>
        <Tab.Screen name={'Likes'} component={Hello} options={{tabBarIcon: () => ( <Ionicons name="heart-outline" size={20} />)}}/>
        <Tab.Screen name={'Near Me'} component={NearMe} options={{tabBarIcon: () => ( <Ionicons name="location-outline" size={20} />)}}/>
        <Tab.Screen name={'Chat'} component={Chat} options={{tabBarIcon: () => ( <Ionicons name="chatbubbles-outline" size={20} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ // Her opretter vi vores styling
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
