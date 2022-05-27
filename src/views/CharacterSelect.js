import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Button, Modal, TextInput, Pressable} from 'react-native';

import {UserContext} from '../contexts/userContext';
import {CharacterContext} from '../contexts/characterContext';
import {
  getAllCharactersForUser,
  postCharacter,
} from '../adapters/charactersAdapter';
import CharacterTile from '../components/CharacterTile';

const CharacterSelect = ({navigation}) => {
  const {userId} = useContext(UserContext);
  const {setCharacter} = useContext(CharacterContext);
  const [characters, setCharacters] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCharName, onChangeNewCharName] = useState('');

  useEffect(() => {
    if (userId) {
      getAllCharactersForUser(userId).then(res => {
        setCharacters(res);
      });
    }
  }, []);

  const handleCreateCharacter = async () => {
    const char = await postCharacter(userId, newCharName);
    setCharacter(char);
    navigation.navigate('Skills');
  };

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View>
          <Text>Character name:</Text>
          <TextInput value={newCharName} onChangeText={onChangeNewCharName} />
          <Button
            title="Create Character"
            onPress={() => handleCreateCharacter()}
          />
        </View>
      </Modal>
      <Text>Select your character:</Text>
      {characters
        ? characters.map(char => {
            return (
              <CharacterTile
                character={char}
                navigation={navigation}
                key={char._id}
              />
            );
          })
        : ''}
      <Button title="+ New Character" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default CharacterSelect;
