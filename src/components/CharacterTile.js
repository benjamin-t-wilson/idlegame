import React, {useState, useContext} from 'react';
import {Pressable, Text, Button} from 'react-native';

import {CharacterContext} from '../contexts/characterContext';
import {getCharacterInfo} from '../adapters/charactersAdapter';

const CharacterTile = ({character, navigation}) => {
  const {setCharacter} = useContext(CharacterContext);
  const [charInfo, setCharInfo] = useState({});
  const [expanded, setExpanded] = useState(false);

  const showInfo = () => {
    if (!Object.keys(charInfo).length > 0) {
      getCharacterInfo(character._id).then(res => {
        setCharInfo(res);
        setExpanded(!expanded);
      });
    } else {
      setExpanded(!expanded);
    }
  };

  const handleSetCharacter = () => {
    setCharacter({...character, ...charInfo});
    navigation.navigate('Skills');
  };

  return (
    <Pressable key={character._id} onPress={() => showInfo()}>
      <Text>{character.name}</Text>
      {expanded ? (
        <>
          <Text>
            Total Level:{' '}
            {Object.keys(charInfo.skills).reduce((totalLevel, skill) => {
              return totalLevel + charInfo.skills[skill].lvl;
            }, 0)}
          </Text>
          {charInfo.active_skill ? (
            <Text>Performing: {charInfo.active_skill.skill}</Text>
          ) : null}
          <Button title="Play" onPress={() => handleSetCharacter()} />
        </>
      ) : null}
    </Pressable>
  );
};

export default CharacterTile;
