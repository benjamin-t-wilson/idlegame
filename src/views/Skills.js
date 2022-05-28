import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, Button} from 'react-native';

import {getAllSkills} from '../adapters/skillsAdapter.js';
import {CharacterContext} from '../contexts/characterContext.js';
import {calculateIdleRewards} from '../services/actionService';
import {postSaveCharacter} from '../adapters/charactersAdapter';
import IdleRewardsModal from '../components/IdleRewardsModal.js';

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
      postSaveCharacter(character);
    }

    if (!skills.length > 0) {
      getAllSkills().then(res => setSkills(res));
    }
  }, []);

  const handleIdleRewards = () => {
    const rightNow = Date.now();

    if (rightNow > character.last_save) {
      setModalVisible(true);
      setModalInfo(calculateIdleRewards(character, setCharacter));
    }
  };

  return (
    <SafeAreaView>
      {modalVisible && modalInfo ? (
        <IdleRewardsModal
          modalInfo={modalInfo}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          charName={character.name}
        />
      ) : null}
      {skills.map(skill => {
        return (
          <Button
            title={skill.name}
            key={skill.name}
            onPress={() =>
              navigation.navigate('NonCombatSkill', {
                skill: skill,
              })
            }
          />
        );
      })}
    </SafeAreaView>
  );
};

export default Skills;
