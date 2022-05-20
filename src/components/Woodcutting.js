import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import SkillShotV2 from './SkillShotV2';
import IdleSkillBar from './IdleSkillBar';

import WoodcuttingData from '../config/skills/woodcutting.json';

const Woodcutting = () => {
  const [exp, setExp] = useState(0);
  const [selected, setSelected] = useState(null);
  const [lvl, setLvl] = useState(1);

  const increaseXp = mod => {
    setExp(prevExp => Math.round(prevExp + selected.reward - (mod / 100) * 2));

    if (exp >= 100 * Math.pow(lvl, 1.25)) {
      setLvl(lvl + 1);
    }
  };

  const increaseXpIdle = () => {
    setExp(prevExp => Math.round(prevExp + selected.reward / 2));

    if (exp >= 100 * Math.pow(lvl, 1.25)) {
      setLvl(lvl + 1);
    }
  };

  return (
    <SafeAreaView>
      <Text>Level {lvl}</Text>
      <Text>{exp}</Text>
      {WoodcuttingData.milestones
        .filter(tree => lvl >= tree.lvl)
        .map(tree => {
          return (
            <Text onPress={() => setSelected(tree)} key={tree.type}>
              {tree.type}
            </Text>
          );
        })}
      {selected ? (
        <>
          <IdleSkillBar action={increaseXpIdle} />
          <SkillShotV2 action={increaseXp} />
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default Woodcutting;
