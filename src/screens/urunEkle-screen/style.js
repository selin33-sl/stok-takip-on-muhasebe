import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#DEE3F0',
    alignItems: 'center',

  },
  imageStyle: {
    maxWidth: windowWidth * 0.4,
    maxHeight: windowHeight * 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',

  },
  inputContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.88,
    height: windowHeight * 0.08,
    backgroundColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: windowWidth * 0.02
  },
  textinput: {
    backgroundColor: 'red',
    flex: 2,
    fontSize: windowHeight * 0.03,
    color: '#000E36',

  },
  camera: {
    flex: 1,
    width: '100%',
  },
  text: {
    flex: 1,
    fontStyle: 'italic',
    fontSize: windowHeight * 0.03,
    color: '#000E36',
    textAlign: 'center',


  },
  button: {
    backgroundColor: '#000E36',
    width: windowWidth * 0.35,
    height: windowHeight * 0.05,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.03,
    elevation: 5

  },
  buttonText: {
    color: 'white',
    fontSize: windowHeight * 0.03,
    fontWeight: '600',
    textAlign: 'center'


  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: windowWidth * 0.02
  }


}
);
