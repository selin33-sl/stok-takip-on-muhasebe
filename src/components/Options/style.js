import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({


  option: {
    width: windowWidth * 0.3,
    borderColor: '#000E36',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    fontSize: windowHeight * 0.025,
    fontWeight: '400',
    color: '#000E36',
    textAlign: 'center'

  }




});
