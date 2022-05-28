import {StyleSheet} from 'react-native';
import {theme} from '../theme.js';

export default StyleSheet.create({
  container: {
    display: 'flex',
    marginVertical: 20,
  },
  mainBar: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.background.light,
  },
  progressBar: {
    backgroundColor: theme.accent.blue,
    position: 'absolute',
  },
});
