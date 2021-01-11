import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {Modaal} from '../modaal'
export function DividerV2(props) {
  const [isVisible, setIsVisible]= useState(false)
    const closeModel=()=>{
      setIsVisible(false)
    }

  return (
    <View>
       <Modaal closeModal={closeModel} isVisible={isVisible} {...props} />
    <TouchableOpacity onPress={()=> setIsVisible(true)} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.item.firstName}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    height: "50%",
    width: "100%",
    borderRadius: 20,
    backgroundColor: "lightblue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 25,
  },
});
