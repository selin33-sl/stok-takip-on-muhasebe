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
        paddingTop: windowHeight * 0.03
    },
    header: {
        fontStyle: 'italic',
        fontSize: windowHeight * 0.03,
        fontWeight: '100',
        color: '#000E36',
    },
    iletisimContainer: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.4,
        borderRadius: 130,
        elevation: 15,
        backgroundColor: '#B5C9FE',
        marginTop: windowHeight * 0.05,
        paddingVertical: windowWidth * 0.1,
        paddingHorizontal: windowWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center'


    },
    iletisimInnerContainer: {
        flexDirection: 'row',
        width: windowWidth * 0.56,
        height: windowHeight * 0.06,
        margin: windowHeight * 0.02,
        alignItems: 'center'
    },
    text: {
        fontSize: windowHeight * 0.02,
        color: '#000E36',
        marginLeft: windowWidth * 0.02
    }


});
