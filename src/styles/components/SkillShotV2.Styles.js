import {StyleSheet} from 'react-native';
import {theme, buttonCommon, textCommon} from '../theme.js';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  mainBar: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.background.light,
  },
  sweetSpot: {
    backgroundColor: theme.accent.green,
    position: 'absolute',
  },
  slider: {
    backgroundColor: theme.accent.blue,
    opacity: 0.5,
    position: 'absolute',
  },
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: theme.background.dark,
    ...buttonCommon,
    marginBottom: 20,
  },
  text: textCommon,
});
