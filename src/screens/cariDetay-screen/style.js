import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#DEE3F0',
    alignItems: 'center',

  },
  buttonContainer: {
    marginTop: windowHeight * 0.1,
    // backgroundColor: 'red',
    height: windowHeight * 0.18

  }






});
