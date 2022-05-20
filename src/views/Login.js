import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

import {postLogin} from '../adapters/usersAdapter';
import {UserContext} from '../contexts/userContext';

const Login = ({navigation}) => {
  const [password, onChangePassword] = useState('');
  const [login, onChangeLogin] = useState('');
  const {setUserId} = useContext(UserContext);

  const handleLogin = async () => {
    const userIdRes = await postLogin({login, password});

    if (userIdRes) {
      setUserId(userIdRes);
      navigation.navigate('CharacterSelect');
    }
  };

  return (
    <View>
      <Text>Username or Email:</Text>
      <TextInput value={login} onChangeText={onChangeLogin} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={onChangePassword} />
      <Button title="Login" onPress={async () => await handleLogin()} />
      <Button
        title="Create an account"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;
