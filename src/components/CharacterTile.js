import React, {useState, useContext} from 'react';
import {Pressable, Text} from 'react-native';

import {CharacterContext} from '../contexts/characterContext';
import {getCharacterInfo} from '../adapters/charactersAdapter';

import styles from '../styles/components/CharacterTile.Styles';

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
    <Pressable
      style={styles.container}
      key={character._id}
      onPress={() => showInfo()}>
      <Text
        style={{...styles.text, fontSize: 20, marginBottom: expanded ? 20 : 0}}>
        {character.name}
      </Text>
      {expanded ? (
        <>
          <Text style={styles.text}>
            Total Level:{' '}
            {Object.keys(charInfo.skills).reduce((totalLevel, skill) => {
              return totalLevel + charInfo.skills[skill].lvl;
            }, 0)}
          </Text>
          {charInfo.active_skill ? (
            <Text style={styles.text}>
              Performing: {charInfo.active_skill.skill}
            </Text>
          ) : null}
          <Pressable
            style={styles.buttonAccent}
            onPress={() => handleSetCharacter()}>
            <Text style={styles.text}>Play</Text>
          </Pressable>
        </>
      ) : null}
    </Pressable>
  );
};

export default CharacterTile;
