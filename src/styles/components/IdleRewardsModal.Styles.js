import {StyleSheet} from 'react-native';
import {theme, buttonCommon, textCommon, containerCommon} from '../theme.js';

export default StyleSheet.create({
  container: {
    ...containerCommon,
    backgroundColor: theme.background.med,
    flex: 1,
    padding: 20,
    elevation: 5,
  },
  subContainer: {
    ...containerCommon,
    backgroundColor: theme.background.light,
    flex: 0,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginTop: 20,
  },
  text: {...textCommon, textAlign: 'center'},
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
  },
  itemContainer: {
    ...textCommon,
    textAlign: 'center',
    backgroundColor: theme.background.dark,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginTop: 15,
  },
});
