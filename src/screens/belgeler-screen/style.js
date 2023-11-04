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
  optionsContainer: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.01

  },

  listContainer: {
    padding: windowWidth * 0.02,
    marginBottom: windowHeight * 0.12
  },
  listEmpty: {
    flex: 1,
    width: windowWidth * 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  listEmptyText: {
    color: 'grey',
    fontSize: windowHeight * 0.02,

  }






});
