import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function RatingFilterButton({ rating, onPress, isSelected }) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={() => onPress(rating)}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'blue', // Adjust the color for selected button
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white', // Adjust the text color for selected button
  },
});

export default RatingFilterButton;