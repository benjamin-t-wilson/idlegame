import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';

import {executeNonCombatSkill} from '../services/actionService';
import {CharacterContext} from '../contexts/characterContext';
import {getSkill} from '../adapters/skillsAdapter';

import SkillShotV2 from './SkillShotV2';
import IdleSkillBar from './IdleSkillBar';

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
    <SafeAreaView>
      {loading ? null : (
        <>
          <View>
            <Text>{skill.name}</Text>
            <Text>Level: {character.skills[skill.name].lvl}</Text>
            <Text>Total EXP: {character.skills[skill.name].xp}</Text>
          </View>
          <View>
            {skill.milestones
              .filter(node => character.skills[skill.name].lvl >= node.lvl)
              .map(node => {
                return (
                  <Button
                    title={node.type}
                    onPress={() => handleNodeSelect(node)}
                    key={node.type}
                    disabled={handleDisabled(node)}
                  />
                );
              })}
          </View>
          <View>
            {selected ? (
              <>
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
    </SafeAreaView>
  );
};

export default NonCombatSkill;
