import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  postSaveCharacter,
  getCharacterInfo,
} from '../adapters/charactersAdapter';
import {CharacterContext} from '../contexts/characterContext';

const NavBar = () => {
  const {character, setCharacter} = useContext(CharacterContext);
  const route = useRoute();

  const noShowScreens = ['Login', 'Register', 'CharacterSelect'];

  const handleSave = () => {
    postSaveCharacter(character).then(() => {
      getCharacterInfo(character._id).then(res =>
        setCharacter(prev => ({
          _id: prev._id,
          name: prev.name,
          last_save: prev.last_save,
          user_id: prev.user_id,
          ...res,
        })),
      );
    });
  };

  return (
    <>
      {!noShowScreens.includes(route.name) ? (
        <View>
          <Button title="Save Character" onPress={() => handleSave()} />
        </View>
      ) : null}
    </>
  );
};

export default NavBar;
