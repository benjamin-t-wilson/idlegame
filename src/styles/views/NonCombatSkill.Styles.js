import {StyleSheet} from 'react-native';
import {theme, buttonCommon, textCommon} from '../theme.js';

const dividerBottom = {
  paddingBottom: 10,
  borderBottomColor: theme.background.light,
  borderBottomWidth: 2,
  marginBottom: 10,
};

export default StyleSheet.create({
  container: {
    backgroundColor: theme.background.med,
    flex: 1,
    padding: 20,
  },
  buttonDark: {
    backgroundColor: theme.background.dark,
    marginBottom: 10,
    ...buttonCommon,
  },
  text: textCommon,
  buttonAccent: {
    backgroundColor: theme.accent.purple,
    ...buttonCommon,
    marginBottom: 10,
  },
  title: {
    ...textCommon,
    fontSize: 20,
    ...dividerBottom,
  },
  subContainer: {
    width: '100%',
    ...dividerBottom,
  },
});
