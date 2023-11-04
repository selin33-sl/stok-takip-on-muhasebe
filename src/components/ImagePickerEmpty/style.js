import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 1,
        height: windowHeight * 0.25,

    },
    imageStyle: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'stretch',

    },

    addButton: {
        height: windowHeight * 0.05,
        width: windowHeight * 0.05,
        backgroundColor: 'green',
        borderRadius: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'

    },

    addButtonContainer: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.05,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        top: windowHeight * 0.2

    },
    addButtonText: {
        fontSize: windowHeight * 0.03,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
        position: 'absolute',
    }




});
