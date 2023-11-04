import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: windowWidth * 0.6,
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: windowHeight * 0.1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#000E36',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: windowHeight * 0.1,
        height: windowHeight * 0.1,
        width: windowWidth * 0.7,
    },
    text: {
        fontSize: windowHeight * 0.055,
        fontStyle: 'italic',
        color: 'yellow',
        textShadowColor: 'black',

    },
    text1: {
        fontSize: windowHeight * 0.055,
        fontStyle: 'italic',
        color: 'white',
        textShadowColor: 'black',

    }

});
