import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        marginTop: windowHeight * 0.1,
        width: windowWidth * 0.7,
        height: windowHeight * 0.1,
        resizeMode: 'stretch'

    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000E36'

    },
    header: {
        color: 'white',
        fontSize: windowHeight * 0.04,

    },
    surum: {
        marginBottom: windowHeight * 0.1,
        color: 'white'
    },

    appIcon: {
        margin: windowHeight * 0.02,
        width: windowWidth * 0.24,
        height: windowHeight * 0.13,
        resizeMode: 'stretch',

    },
    logo: {
        margin: windowHeight * 0.08,
        bottom: 1,
        width: windowWidth * 0.5,
        height: windowHeight * 0.1,
        resizeMode: 'stretch'
    }


});
