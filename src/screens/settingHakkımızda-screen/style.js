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
        padding: windowHeight * 0.05
    },
    text: {
        fontSize: windowHeight * 0.02,
        color: '#000E36'
    },
    linkText: {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: windowHeight * 0.027
    },
    linkContainer: {
        marginTop: windowHeight * 0.03
    }


});
