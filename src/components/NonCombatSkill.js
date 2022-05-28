import React, {useState, useContext, useEffect} from 'react';
import {Text, Pressable, View, ScrollView} from 'react-native';

import {executeNonCombatSkill} from '../services/actionService';
import {CharacterContext} from '../contexts/characterContext';
import {getSkill} from '../adapters/skillsAdapter';

import SkillShotV2 from './SkillShotV2';
import IdleSkillBar from './IdleSkillBar';

import styles from '../styles/views/NonCombatSkill.Styles';

const NonCombatSkill = ({route}) => {
  const [skill, setSkill] = useState(route.params.skill);
  const [selected, setSelected] = useState(null);
  const {character, setCharacter} = useContext(CharacterContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkill(skill._id).then(res => {
      setSkill(prev => ({...prev, milestones: res}));
      setLoading(false);
    });

    if (
      character?.active_skill?.skill == skill.name &&
      !handleDisabled(character.active_skill.node)
    ) {
      setSelected(character.active_skill.node);
    }
  }, []);

  const handleSkillShotAction = mod => {
    if (
      !executeNonCombatSkill(
        character,
        setCharacter,
        skill.name,
        selected.reward - (mod / 100) * 2,
        selected,
      )
    ) {
      setSelected(prev => {});
      setCharacter(prevState => ({
        ...prevState,
        active_skill: {},
      }));
    }
  };

  const handleIdleAction = () => {
    if (
      !executeNonCombatSkill(
        character,
        setCharacter,
        skill.name,
        selected.reward / 2,
        selected,
      )
    ) {
      setSelected(prev => {});
      setCharacter(prevState => ({
        ...prevState,
        active_skill: {},
      }));
    }
  };

  const handleNodeSelect = node => {
    setSelected(prev => node);
    setCharacter(prevState => ({
      ...prevState,
      active_skill: {skill: skill.name, node},
    }));
  };

  const handleDisabled = node => {
    if (node.requires?.some(x => x)) {
      const presentItems = node.requires.filter(item => {
        return (
          character.inventory[item.name] &&
          character.inventory[item.name].quantity >= item.quantity
        );
      });

      return presentItems.length !== node.requires.length;
    }

    return false;
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? null : (
        <>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{skill.name}</Text>
            <Text style={styles.text}>
              Level: {character.skills[skill.name].lvl}
            </Text>
            <Text style={{...styles.text, marginTop: 10}}>
              Total EXP: {character.skills[skill.name].xp}
            </Text>
          </View>
          <View style={{...styles.subContainer, alignItems: 'center'}}>
            {skill.milestones
              .filter(node => character.skills[skill.name].lvl >= node.lvl)
              .map((node, idx) => {
                return (
                  <Pressable
                    style={
                      idx % 2 === 0 ? styles.buttonAccent : styles.buttonDark
                    }
                    onPress={() => handleNodeSelect(node)}
                    key={node.type}
                    disabled={handleDisabled(node)}>
                    <Text style={styles.text}>{node.type}</Text>
                  </Pressable>
                );
              })}
          </View>
          <View style={{...styles.subContainer, alignItems: 'center'}}>
            {selected ? (
              <>
                <Text style={styles.text}>
                  {skill.name} {selected.type}
                </Text>
                <IdleSkillBar
                  key={selected.type}
                  action={handleIdleAction}
                  interval={selected.interval ? selected.interval * 1000 : 2000}
                />
                <SkillShotV2
                  key={selected.type + 'skillShot'}
                  action={handleSkillShotAction}
                />
              </>
            ) : null}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default NonCombatSkill;
