import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#DEE3F0',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowWidth * 1,
    height: windowHeight * 0.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 0.035,
    padding: 20,

  }

});

