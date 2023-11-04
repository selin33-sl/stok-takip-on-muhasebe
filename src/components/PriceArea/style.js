import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({

    container: {
        backgroundColor: 'pink',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
        width: windowWidth * 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    innerContainer: {
        width: '100%',
        backgroundColor: '#B5C9FE',
        paddingHorizontal: windowWidth * 0.02,
        paddingVertical: windowWidth * 0.015,
        width: windowWidth * 1,

        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 2
    },

    button: {
        bottom: windowHeight * 0.02,
        backgroundColor: '#000E36',
        borderRadius: 100,
        width: windowWidth * 0.09,
        height: windowWidth * 0.09,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    textContainer: {

        flexDirection: 'row',
        height: windowHeight * 0.025,
        margin: windowHeight * 0.001,
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: windowHeight * 0.02

    }


});
