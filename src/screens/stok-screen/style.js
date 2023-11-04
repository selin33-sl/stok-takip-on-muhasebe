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
    height: windowHeight * 1,
    // paddingBottom: windowHeight * 0.2,


  },
  loadingIndicator: {
    width: windowWidth * 1,
    height: windowHeight * 1

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

  },
  listContainer: {
    paddingBottom: windowHeight * 0.155,
    // backgroundColor: 'red'

  },
  priceContainer: {
    bottom: 0,
    position: 'absolute',
    width: windowWidth * 1,
    height: windowHeight * 0.1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#CDD4E7',
  }




});
