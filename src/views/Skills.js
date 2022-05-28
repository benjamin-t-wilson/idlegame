import React, {useEffect, useState, useContext} from 'react';
import {View, Pressable, Text} from 'react-native';

import {getAllSkills} from '../adapters/skillsAdapter.js';
import {CharacterContext} from '../contexts/characterContext.js';
import {calculateIdleRewards} from '../services/actionService';
import {
  getCharacterInfo,
  postSaveCharacter,
} from '../adapters/charactersAdapter';
import IdleRewardsModal from '../components/IdleRewardsModal.js';

import styles from '../styles/views/Skills.Styles';

const Skills = ({navigation}) => {
  const {character, setCharacter} = useContext(CharacterContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [idleXpComplete, setIdleXpComplete] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (
      !idleXpComplete &&
      character &&
      Object.keys(character).length > 0 &&
      character.active_skill &&
      character.last_save
    ) {
      handleIdleRewards();
      setIdleXpComplete(true);
      (async () => {
        await handleSave();
      })();
    }

    if (!skills.length > 0) {
      getAllSkills().then(res => setSkills(res));
    }
  }, []);

  const handleSave = async () => {
    const save = await postSaveCharacter(character);
    const charInfo = await getCharacterInfo(character._id);
    await setCharacter(prev => ({
      _id: prev._id,
      name: prev.name,
      last_save: prev.last_save,
      user_id: prev.user_id,
      ...charInfo,
    }));
  };

  const handleIdleRewards = () => {
    const rightNow = Date.now();

    if (rightNow > character.last_save) {
      setModalVisible(true);
      setModalInfo(calculateIdleRewards(character, setCharacter));
    }
  };

  return (
    <View style={styles.container}>
      {modalVisible && modalInfo ? (
        <IdleRewardsModal
          modalInfo={modalInfo}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          charName={character.name}
        />
      ) : null}
      <Text style={{...styles.text, marginTop: 20}}>Select a skill:</Text>
      {skills.map((skill, idx) => {
        return (
          <Pressable
            style={idx % 2 === 0 ? styles.buttonAccent : styles.buttonDark}
            key={skill.name}
            onPress={() =>
              navigation.navigate('NonCombatSkill', {
                skill: skill,
              })
            }>
            <Text style={styles.text}>{skill.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Skills;
