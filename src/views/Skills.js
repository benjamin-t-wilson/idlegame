import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, Button, Modal, Text, View} from 'react-native';

import {getAllSkills} from '../adapters/skillsAdapter.js';
import {CharacterContext} from '../contexts/characterContext.js';
import {calculateIdleRewards} from '../services/actionService';
import {postSaveCharacter} from '../adapters/charactersAdapter';

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
      setIdleXpComplete(true);
      handleIdleRewards();
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
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View>
            <Text>Hi {character.name}</Text>
            <Text>Since you been gone:</Text>
            <View>
              <Text>
                You performed action: {modalInfo.activeSkillName || ''} -{' '}
                {modalInfo.activeNodeType || ''} a total of{' '}
                {modalInfo.timesSkilled || ''} times.
              </Text>
              <Text>
                You gained {modalInfo.xpGained || ''}{' '}
                {modalInfo.activeSkillName || ''} experience.
              </Text>
              {modalInfo.prevLvl < modalInfo.lvl ? (
                <Text>
                  That brings you from level {modalInfo.prevLvl || ''} to{' '}
                  {modalInfo.lvl || ''}
                </Text>
              ) : null}
              {modalInfo.dropsGained &&
              Object.keys(modalInfo.dropsGained).length > 0 ? (
                <View>
                  <Text>You gained the following drops:</Text>
                  {Object.keys(modalInfo.dropsGained).map(drop => {
                    return (
                      <Text key={drop}>
                        {modalInfo.dropsGained[drop]}x {drop}
                      </Text>
                    );
                  })}
                </View>
              ) : null}
            </View>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
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
