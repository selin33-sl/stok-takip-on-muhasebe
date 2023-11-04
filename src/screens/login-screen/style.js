import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#000E36',
    justifyContent: 'flex-end'

  },
  inputContainer: {
    width: windowWidth * 0.65,
    height: windowHeight * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    top: windowHeight * 0.1,


  },
  labelText: {
    fontSize: windowHeight * 0.04,
    color: 'orange',
    fontStyle: 'italic',
    fontWeight: '300',
    marginBottom: windowHeight * 0.01,
    alignSelf: 'center'
  },
  messageContainer: {
    width: windowWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: 'red',
    fontSize: windowHeight * 0.02,
    alignSelf: 'center'
  },
  imageStyle: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  innerContainer: {
    height: windowHeight * 0.75,
    width: windowWidth * 1,
    backgroundColor: '#DEE3F0',
    borderTopLeftRadius: 300,
    alignItems: 'center',


  },
  checkboxContainer: {
    width: windowWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start'

  },
  loginButton: {
    backgroundColor: '#000E36',
    width: windowWidth * 0.35,
    height: windowHeight * 0.07,
    top: windowHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: windowHeight * 0.01,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: windowHeight * 0.025,
    color: 'white',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.46,
    height: windowHeight * 0.04,
    top: windowHeight * 0.02,
  },
  optionText: {
    color: '#000E36',
    fontSize: windowHeight * 0.017,
  },
  optionButton: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.035,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    fontWeight: 'bold',
    color: '#000E36',
    fontSize: windowHeight * 0.022,
  },
  surum: {
    marginTop: windowHeight * 0.17,
    color: '#000E36',
    fontSize: windowHeight * 0.01
  }
});
