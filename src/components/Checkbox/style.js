import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    margin: windowWidth * 0.02,
    width: windowWidth * 0.5,
    alignItems: 'center',
    alignItems: 'center',
  },
  checkbox: {
    padding: windowWidth * 0.02,
    alignSelf: 'center',
    color: '#000E36',


  },
  label: {
    color: '#000E36',
    fontSize: windowHeight * 0.025,
    alignItems: 'center'
  },
});
