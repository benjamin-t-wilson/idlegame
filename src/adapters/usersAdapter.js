import {API_URL} from '@env';

import {encodeString} from '../services/encryptionService';

export const postRegister = async info => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: encodeString(info.email),
      username: info.username,
      password: encodeString(info.password),
    }),
  });

  const {userId} = await response.json();

  return userId && response.ok ? userId : null;
};

export const postLogin = async creds => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: creds.login,
        password: encodeString(creds.password),
      }),
    });

    const {userId} = await response.json();

    return userId && response.ok ? userId : null;
  } catch (err) {
    return err;
  }
};
