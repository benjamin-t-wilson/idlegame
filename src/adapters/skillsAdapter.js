import {API_URL} from '@env';

export const getAllSkills = async () => {
  const response = await fetch(`${API_URL}/skills`);
  const skills = await response.json();

  return skills;
};

export const getSkill = async id => {
  const response = await fetch(`${API_URL}/skills/${id}`);
  const skills = await response.json();

  return skills;
};
