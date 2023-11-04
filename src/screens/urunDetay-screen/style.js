import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#DEE3F0',
    alignItems: 'center',

  },
  imageStyle: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.12,
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'stretch',

  },
  scroll: {
    marginTop: windowHeight * 0.05
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
  text: {
    flex: 1,
    fontStyle: 'italic',
    fontSize: windowHeight * 0.03,
    color: '#000E36',
    textAlign: 'center',


  },
  buttonContainer: {
    flexDirection: 'row',
    padding: windowWidth * 0.1,
    width: windowWidth * 1,
    height: windowHeight * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  deleteContainer: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.025,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',


  },
  camera: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    // elevation: 3,
    // borderWidth: 0.1,
    // width: windowWidth * 0.45,
    // height: windowHeight * 0.15,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: windowWidth * 0.02
  }



}
);
