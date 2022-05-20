/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CharacterContext} from './src/contexts/characterContext.js';
import {UserContext} from './src/contexts/userContext.js';

import NavBar from './src/components/NavBar.js';
import Login from './src/views/Login.js';
import Register from './src/views/Register.js';
import CharacterSelect from './src/views/CharacterSelect.js';
import Skills from './src/views/Skills.js';
import NonCombatSkill from './src/components/NonCombatSkill.js';

const App = props => {
  const Stack = createNativeStackNavigator();
  const [userId, setUserId] = useState('');
  const [character, setCharacter] = useState({});

  return (
    <NavigationContainer>
      <CharacterContext.Provider value={{character, setCharacter}}>
        <UserContext.Provider value={{userId, setUserId}}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              // headerShown: false,
              header: props => <NavBar {...props} />,
            }}>
            <Stack.Screen name="Login">
              {props => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <Register {...props} />}
            </Stack.Screen>
            <Stack.Screen name="CharacterSelect">
              {props => <CharacterSelect {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Skills">
              {props => <Skills {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="NonCombatSkill"
              options={({route, navigation}) => ({
                title: route.params.skill.name,
              })}>
              {props => <NonCombatSkill {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </UserContext.Provider>
      </CharacterContext.Provider>
    </NavigationContainer>
  );
};

export default App;
