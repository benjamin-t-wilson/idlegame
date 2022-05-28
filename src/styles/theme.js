export const theme = {
  background: {
    dark: '#1d1d1f',
    light: '#3e3d40',
    med: '#313133',
  },
  text: {
    light: '#f7f7f7',
    dark: '#929294',
  },
  accent: {
    purple: '#6362fb',
    green: '#6fce97',
    blue: '#2882fd',
  },
};

export const buttonCommon = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 4,
  elevation: 3,
  marginTop: 20,
  width: '60%',
};

export const textCommon = {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: theme.text.light,
};

export const inputCommon = {
  backgroundColor: theme.background.light,
  width: '80%',
  borderRadius: 10,
  marginVertical: 15,
  paddingHorizontal: 20,
  height: 50,
  elevation: 5,
  ...textCommon,
};

export const containerCommon = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.background.med,
  flex: 1,
};
