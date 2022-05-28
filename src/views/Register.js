import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';

import {postRegister} from '../adapters/usersAdapter';
import {setUserId} from '../contexts/userContext';

import styles from '../styles/views/Register.Styles';

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
    <View style={styles.container}>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={onChangeEmail}
      />
      <Text style={{...styles.text, marginTop: 40}}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={onChangeUsername}
      />
      <Text style={{...styles.text, marginTop: 40}}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={onChangePassword}
      />
      <Pressable
        style={styles.buttonAccent}
        onPress={async () => await handleRegister()}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
};

export default Register;
