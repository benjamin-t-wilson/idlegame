import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';

import {executeNonCombatSkill} from '../services/actionService';
import {CharacterContext} from '../contexts/characterContext';

import SkillShotV2 from './SkillShotV2';
import IdleSkillBar from './IdleSkillBar';

const NonCombatSkill = ({route}) => {
  const skill = route.params.skill;
  const [selected, setSelected] = useState(null);
  const {character, setCharacter} = useContext(CharacterContext);

  useEffect(() => {
    if (character?.active_skill?.skill?.name == skill.name) {
      setSelected(character.active_skill.node);
    }
  }, []);

  const handleSkillShotAction = mod => {
    executeNonCombatSkill(
      character,
      setCharacter,
      skill.name,
      selected.reward - (mod / 100) * 2,
      selected,
    );
    // handleItemConsumption();
  };

  const handleIdleAction = () => {
    executeNonCombatSkill(
      character,
      setCharacter,
      skill.name,
      selected.reward / 2,
      selected,
    );
    // handleItemConsumption();
  };

  const handleNodeSelect = node => {
    setSelected(node);
    setCharacter({...character, active_skill: {skill, node}});
  };

  // const handleItemConsumption = () => {
  //   if (selected.requires?.some(x => x)) {
  //     let invCopy = character.inventory;

  //     selected.requires.every(item => {
  //       invCopy[item.name] -= item.quantity;

  //       if (invCopy[item.name] == 0) {
  //         setSelected({});
  //         return false;
  //       }
  //     });

  //     setCharacter(prevChar => ({...prevChar, inventory: invCopy}));
  //   }
  // };

  const handleDisabled = node => {
    if (node.requires?.some(x => x)) {
      const presentItems = node.requires.filter(item => {
        return (
          character.inventory[item.name] &&
          character.inventory[item.name] >= item.quantity
        );
      });

      return presentItems.length == node.requires.length;
    }

    return false;
  };

  return (
    <SafeAreaView>
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
            <IdleSkillBar action={handleIdleAction} />
            <SkillShotV2 action={handleSkillShotAction} />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default NonCombatSkill;
