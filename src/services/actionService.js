export const increaseSkillXp = (character, setCharacter, skill, amount) => {
  setCharacter(prevState => ({
    ...prevState,
    skills: {
      ...prevState.skills,
      [skill]: {
        ...prevState.skills[skill],
        xp: Math.floor((prevState.skills[skill].xp += amount)),
      },
    },
  }));

  if (
    character.skills[skill].xp >=
    100 * Math.pow(character.skills[skill].lvl, 2.59)
  ) {
    setCharacter(prevState => ({
      ...prevState,
      skills: {
        ...prevState.skills,
        [skill]: {
          ...prevState.skills[skill],
          lvl: Math.floor(Math.pow(prevState.skills[skill].xp / 100, 0.3861)),
        },
      },
    }));
  }
};

export const calculateIdleRewards = (character, setCharacter) => {
  const rightNow = Date.now();
  const activeSkill = character.active_skill.skill;
  const activeNode = character.active_skill.node;
  const timesSkilled = Math.floor((rightNow - character.last_save) / 2000);
  let xpGained = 0;
  const prevLvl = character.skills[activeSkill.name].lvl;
  const dropsGained = {};
  let charCopy = {...character};

  for (let i = 0; i < timesSkilled; i++) {
    let drops = calculateDrops(activeNode);
    drops.forEach(drop => {
      charCopy.inventory[drop.name] = charCopy.inventory[drop.name]
        ? (charCopy.inventory[drop.name] += drop.quantity)
        : drop.quantity;

      dropsGained[drop.name] = dropsGained[drop.name]
        ? (dropsGained[drop.name] += drop.quantity)
        : drop.quantity;
    });

    xpGained += activeNode.reward / 2;
  }

  charCopy.skills[activeSkill.name].xp += xpGained;
  if (
    charCopy.skills[activeSkill.name].xp >=
    100 * Math.pow(charCopy.skills[activeSkill.name].lvl, 2.59)
  ) {
    charCopy.skills[activeSkill.name].lvl = Math.floor(
      Math.pow(charCopy.skills[activeSkill.name].xp / 100, 0.3861),
    );
  }

  setCharacter(charCopy);

  return {
    activeSkillName: activeSkill.name,
    activeNodeType: activeNode.type,
    timesSkilled,
    xpGained,
    prevLvl,
    lvl: character.skills[activeSkill.name].lvl,
    dropsGained,
  };
};

export const calculateDrops = node => {
  if (node.drops?.some(x => x)) {
    return node.drops.filter(drop => {
      if (Math.random() < drop.chance) {
        return drop;
      }
    });
  }
};

export const addDrops = (character, setCharacter, drops) => {
  let invCopy = character.inventory;

  drops.forEach(drop => {
    invCopy[drop.name] = invCopy[drop.name]
      ? (invCopy[drop.name] += drop.quantity)
      : drop.quantity;
  });

  setCharacter(prevChar => ({...prevChar, inventory: invCopy}));
};

export const calculateAndAddDrops = (character, setCharacter, node) => {
  if (node.drops?.some(x => x)) {
    let drops = node.drops.filter(drop => {
      if (Math.random() < drop.chance) {
        return drop;
      }
    });

    let invCopy = character.inventory;

    drops.forEach(drop => {
      invCopy[drop.name] = invCopy[drop.name]
        ? (invCopy[drop.name] += drop.quantity)
        : drop.quantity;
    });

    setCharacter(prevChar => ({...prevChar, inventory: invCopy}));
  }
};

export const executeNonCombatSkill = (
  character,
  setCharacter,
  skill,
  expGain,
  selectedNode,
) => {
  let charCopy = {...character};

  let drops = calculateDrops(selectedNode);
  drops.forEach(drop => {
    charCopy.inventory[drop.name] = charCopy.inventory[drop.name]
      ? (charCopy.inventory[drop.name] += drop.quantity)
      : drop.quantity;
  });

  charCopy.skills[skill].xp += Math.floor(expGain);
  if (
    charCopy.skills[skill].xp >=
    100 * Math.pow(charCopy.skills[skill].lvl, 2.59)
  ) {
    charCopy.skills[skill].lvl = Math.floor(
      Math.pow(charCopy.skills[skill].xp / 100, 0.3861),
    );
  }

  setCharacter(charCopy);
};
