import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {postSaveCharacter} from '../adapters/charactersAdapter';
import {CharacterContext} from '../contexts/characterContext';

const NavBar = () => {
  const {character} = useContext(CharacterContext);
  const route = useRoute();
  //   const appState = useRef(AppState.currentState);

  const noShowScreens = ['Login', 'Register', 'CharacterSelect'];

  //   useEffect(() => {
  //     const subscription = AppState.addEventListener('change', nextAppState => {
  //       if (nextAppState !== 'active') {
  //         postSaveCharacter(character);
  //       }
  //       appState.current = nextAppState;
  //     });

  //     return () => {
  //       subscription.remove();
  //     };
  //   }, []);

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
