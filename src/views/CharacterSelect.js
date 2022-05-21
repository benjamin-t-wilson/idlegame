import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Button, Modal, TextInput, Pressable} from 'react-native';

import {UserContext} from '../contexts/userContext';
import {CharacterContext} from '../contexts/characterContext';
import {
  getAllCharactersForUser,
  postCharacter,
} from '../adapters/charactersAdapter';

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

  const handleSetCharacter = char => {
    setCharacter(char);
    navigation.navigate('Skills');
  };

  const handleCreateCharacter = async () => {
    const char = await postCharacter(userId, newCharName);
    handleSetCharacter(char);
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
              <Pressable
                key={char._id}
                onPress={() => handleSetCharacter(char)}>
                <Text>{char.name}</Text>
                <Text>
                  Total Level:{' '}
                  {Object.keys(char.skills).reduce((totalLevel, skill) => {
                    return totalLevel + char.skills[skill].lvl;
                  }, 0)}
                </Text>
                <Text>Performing: {char.active_skill.skill}</Text>
              </Pressable>
            );
          })
        : ''}
      <Button title="+ New Character" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default CharacterSelect;
