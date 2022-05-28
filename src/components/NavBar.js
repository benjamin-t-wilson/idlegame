import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {postSaveCharacter} from '../adapters/charactersAdapter';
import {CharacterContext} from '../contexts/characterContext';

const NavBar = () => {
  const {character} = useContext(CharacterContext);
  const route = useRoute();

  const noShowScreens = ['Login', 'Register', 'CharacterSelect'];

  return (
    <>
      {!noShowScreens.includes(route.name) ? (
        <View>
          <Button
            title="Save Character"
            onPress={() => postSaveCharacter(character)}
          />
        </View>
      ) : null}
    </>
  );
};

export default NavBar;
