import {StyleSheet} from 'react-native';
import {
  theme,
  buttonCommon,
  textCommon,
  inputCommon,
  containerCommon,
} from '../theme.js';

export default StyleSheet.create({
  container: {
    ...containerCommon,
    backgroundColor: theme.background.light,
    flex: 0,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginTop: 20,
    width: '80%',
  },
  text: textCommon,
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
  },
});
