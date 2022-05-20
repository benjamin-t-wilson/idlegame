import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

import {postRegister} from '../adapters/usersAdapter';
import {setUserId} from '../contexts/userContext';

const Register = ({navigation}) => {
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');

  const handleRegister = async () => {
    const userId = await postRegister({email, username, password});

    if (userId) {
      setUserId(userId);
      navigation.navigate('CharacterSelect');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={onChangeEmail} />
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={onChangeUsername} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={onChangePassword} />
      <Button title="Register" onPress={async () => await handleRegister()} />
    </View>
  );
};

export default Register;
