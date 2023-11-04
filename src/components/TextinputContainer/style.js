import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  textContainer: {
    flexDirection: 'row'
  },
  star: {
    color: 'red'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textinput: {
    flex: 2,
    fontSize: windowHeight * 0.02,
    color: '#000E36',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: windowWidth * 0.4,

  },
  text: {
    flex: 1,
    fontStyle: 'italic',
    fontSize: windowHeight * 0.02,
    color: '#000E36',
    textAlign: 'center',
    width: windowWidth * 0.3,

  },

  iconContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    right: 1
  }


}
);
