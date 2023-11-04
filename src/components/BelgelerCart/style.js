import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({

  cart:{
    width:windowWidth*0.9,
    height:windowHeight*0.1,
   marginVertical:windowHeight*0.01,
   borderRadius:5,
   justifyContent:'space-between',
   padding:windowWidth*0.02

  },
  tarih:{
    fontSize:windowHeight*0.02,
    color:'white'

  },
  type:{
    fontSize:windowHeight*0.02,
    color:'white',
    fontWeight:'600'
  },
  name:{
    fontSize:windowHeight*0.02,
    color:'white',
    fontWeight:'600'

  },
  container:{
    flexDirection:'row',
    alignItems:'center'
    
  },
  ozellik:{
    fontSize:windowHeight*0.02,
    color:'white',
    fontStyle:'italic'
  }





});
