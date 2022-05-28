import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Pressable, Modal, TextInput} from 'react-native';

import {UserContext} from '../contexts/userContext';
import {CharacterContext} from '../contexts/characterContext';
import {
  getAllCharactersForUser,
  postCharacter,
} from '../adapters/charactersAdapter';
import CharacterTile from '../components/CharacterTile';

import styles from '../styles/views/CharacterSelect.Styles';

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
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.container}>
          <Text style={styles.text}>Character name:</Text>
          <TextInput
            style={styles.input}
            value={newCharName}
            onChangeText={onChangeNewCharName}
          />
          <Pressable
            style={styles.buttonAccent}
            onPress={() => handleCreateCharacter()}>
            <Text style={styles.text}>Create Character</Text>
          </Pressable>
        </View>
      </Modal>
      <Text style={styles.text}>Select your character:</Text>
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
      <Pressable
        style={styles.buttonDark}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>+ New Character</Text>
      </Pressable>
    </View>
  );
};

export default CharacterSelect;
