import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';

import {postLogin} from '../adapters/usersAdapter';
import {UserContext} from '../contexts/userContext';

import styles from '../styles/views/Login.Styles';

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
    <View style={styles.container}>
      <Text style={styles.text}>Username or Email:</Text>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={onChangeLogin}
      />
      <Text style={{...styles.text, marginTop: 40}}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <Pressable
        style={styles.buttonAccent}
        onPress={async () => await handleLogin()}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.buttonDark}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Create an account</Text>
      </Pressable>
    </View>
  );
};

export default Login;
