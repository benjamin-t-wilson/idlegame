import {StyleSheet} from 'react-native';
import {
  theme,
  buttonCommon,
  textCommon,
  inputCommon,
  containerCommon,
} from '../theme.js';

export default StyleSheet.create({
  container: containerCommon,
  text: textCommon,
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
  },
  input: inputCommon,
});
