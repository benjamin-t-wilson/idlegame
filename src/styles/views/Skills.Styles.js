import {StyleSheet} from 'react-native';
import {theme, buttonCommon, textCommon, containerCommon} from '../theme.js';

export default StyleSheet.create({
  container: {...containerCommon, justifyContent: 'flex-start'},
  buttonDark: {
    backgroundColor: theme.background.dark,
    ...buttonCommon,
  },
  text: textCommon,
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
  },
});
