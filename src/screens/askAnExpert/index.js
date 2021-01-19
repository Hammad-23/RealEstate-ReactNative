import React, { useEffect, useState } from "react";
import { agentListService } from "../../services/agentListService";
import { View, StyleSheet, Text, ScrollView, SafeAreaView,TouchableOpacity,Image } from "react-native";
import { DividerV2 } from "../../components/dividerV2/index";
import Separator from '../../components'

export const AgenList = () => {
  const [AgenList, setAgentList] = useState([]);
  useEffect(() => {
    getAgent();
  }, []);
  const getAgent = async () => {
    const get = await agentListService();
    setAgentList(get);
    return get;
  };

  return (
    // <View style={styles.container}>
    //   <ScrollView contentContainerStyle={{ marginTop: "10%" }}>
    //     <View style={styles.headerContainer}>
    //       <Text style={styles.textContainer}>Ask an expert</Text>
    //     </View>

    //     {AgenList.map((item, index) => (
    //       <View key={index}>
    //         <DividerV2 item={item} />
    //       </View>
    //     ))}
    //   </ScrollView>
    // </View>
    <View style={{height:'100%'}}>
      <View style={styles.firstHead}>
        <Text style={styles.headerText}>
          {/* <Image source={ require("../../../assets/landing_screen_assets/ask-an-expert.png")}/> */}
         Ask An Expert
        </Text>
      </View >
      <View style={styles.DefDiv}>
        <Text style={styles.txtHead}>Common Definations</Text>
        
        <Text style={styles.loanText}>FHA loan is a Federal House Administration</Text>
        <Text style={styles.loanText}>Loan Which is a Home Loan backed by the</Text>
        <Text style={styles.loanText}>Federal government</Text>
      </View>
    <View style={styles.big}>
      <View style={styles.boxContainer}> 
      <TouchableOpacity style={styles.smallBox}>
         <Text style={styles.textInsideBox}>FaQ's</Text>
       </TouchableOpacity>
       <View style={{width:20}}></View>
       <TouchableOpacity style={styles.smallBox}>
         <Text style={styles.textInsideBox}>Chat</Text>
       </TouchableOpacity>
       </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: "10%",
  },
  divider: {
    height: "30%",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    fontSize: 30,
    fontFamily: "default-light",
    color: "green",
  },
  firstHead: {
    borderBottomRightRadius:45,
    borderBottomLeftRadius:45,
    backgroundColor:'rgba(14, 96, 80, 0.85)',
    height:70,
    alignItems:'center',
    justifyContent:'center'
  },
  smallBox: {
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#00000010",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    height:100,
    alignItems:'center',
    justifyContent:'center',
    width:100
  },
  boxContainer: {
    flexDirection:'row',
    justifyContent:'center'
  },
  textInsideBox: {
    color: 'green',
    fontSize:18,
    fontWeight:'bold'
  },
  big: {
    height:'60%',
    justifyContent:'center'
  },
  headerText: {
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  txtHead: {
    color:'green',
    fontSize:18,
    fontWeight:'bold'
  },
  DefDiv: {
    alignItems:'center',
    justifyContent:'center',
    marginTop:30
  },
  loanText: {
    color:'brown'
  }
});
