import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.06,
    marginTop: windowWidth * 0.03,
  },
  containerPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.06,
    zIndex: 1,
    position: 'absolute'
    // marginTop: windowWidth * 0.03,
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    height: windowHeight * 0.07,

  },
  buttonText: {
    color: 'white',
    fontSize: windowHeight * 0.02,
    fontWeight: '400',
    textAlign: 'center'


  }


}
);
