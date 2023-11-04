import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({

  cart: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    backgroundColor: '#DEE3F0',
    borderColor: '#000E36',
    borderWidth: 1,
    borderRadius: 10,
    margin: windowWidth * 0.015,
    flexDirection: 'row',
    padding: windowWidth * 0.02,
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  inner: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: windowHeight * 0.08,
    width: windowWidth * 0.25,


  }, imageStyle: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'stretch'

  },
  nameContainer: {
    justifyContent: 'center',
    width: windowWidth * 0.45,
    height: windowHeight * 0.08,
    marginLeft: 4
  },

  name: {
    fontSize: windowHeight * 0.017,
    fontWeight: '500',
    color: '#000E36',

  },
  sk: {
    fontSize: windowHeight * 0.015,
    color: '#000E36'

  },
  adet: {
    fontSize: windowHeight * 0.011,
    color: '#000E36'

  }



});
