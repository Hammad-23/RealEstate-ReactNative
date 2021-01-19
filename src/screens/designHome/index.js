import React from "react";
import { StyleSheet, Dimensions, Image,View,Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";



export default function DesignHome(){
    return(
        <SafeAreaView>
         <View style={styles.firstHead}>
        <Text style={styles.headerText}>Design Your Home</Text>
      </View>
    
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    firstHead: {
        borderBottomRightRadius:45,
        borderBottomLeftRadius:45,
        backgroundColor:'rgba(14, 96, 80, 0.85)',
        height:70,
        alignItems:'center',
        justifyContent:'center'
      },
      headerText: {
        color:'white',
        fontSize:18,
        fontWeight:'bold'
      },
})