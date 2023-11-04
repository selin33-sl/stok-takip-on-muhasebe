import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        borderRadius: 10,
        elevation: 5,
        margin: windowHeight * 0.01

    },

    innerContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconTextContainer: {
        flex: 4,
        flexDirection: 'row',
        height: windowHeight * 0.06,
        alignItems: 'center',
        paddingLeft: 4

    },
    icon: {
        flex: 1,
        height: windowHeight * 0.06,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        fontSize: windowHeight * 0.02,
        marginLeft: 10,
        color: 'white'

    }


});
