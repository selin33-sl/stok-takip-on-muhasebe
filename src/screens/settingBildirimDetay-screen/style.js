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
        // alignItems: 'center',
        paddingHorizontal: windowWidth * 0.03
        // padding: windowHeight * 0.05
    },
    text: {
        fontSize: windowHeight * 0.02,
        color: 'black'
    },
    linkText: {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: windowHeight * 0.027
    },
    linkContainer: {
        marginTop: windowHeight * 0.03
    },
    listContainer: {
        padding: windowWidth * 0.02,
        marginBottom: windowHeight * 0.12
    },
    imageContainer: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: windowHeight * 0.02


    },
    image: {
        width: windowWidth * 0.6,
        height: windowWidth * 0.6

    }


});
