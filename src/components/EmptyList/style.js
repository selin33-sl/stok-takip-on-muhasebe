import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: windowHeight * 0.2

  },
  text: {
    color: '#B7B7B7',
    fontSize: windowHeight * 0.035,
    fontWeight: '700'
  }





});
