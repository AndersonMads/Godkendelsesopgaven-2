import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText) {
      setMessages([...messages, { id: messages.length, text: inputText }]);
      setInputText('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, margin: 5, padding: 5 }}
          placeholder="Type a message"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default Chat;