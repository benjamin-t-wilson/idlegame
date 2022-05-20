import {API_URL} from '@env';

export const getAllCharactersForUser = async id => {
  const response = await fetch(`${API_URL}/characters/all/${id}`);
  const characters = await response.json();

  return characters;
};

export const getCharacter = async id => {
  const response = await fetch(`${API_URL}/characters/single/${id}`);
  const character = await response.json();

  return character;
};

export const postCharacter = async (userId, name) => {
  const response = await fetch(`${API_URL}/characters`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      name,
    }),
  });

  const character = await response.json();

  return character;
};

export const postSaveCharacter = async character => {
  const response = await fetch(`${API_URL}/characters/${character._id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

  return response.ok;
};
