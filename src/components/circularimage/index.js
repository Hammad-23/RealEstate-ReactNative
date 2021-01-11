import React, {useState} from "react";
import { TouchableOpacity, Image, Text,View } from "react-native";

import {Modaal} from '../modaal'

function CircularImage(props) {
    const [isVisible, setIsVisible]= useState(false)
  const closeModel=()=>{
    setIsVisible(false)
  }
  return (
      <View>
          <Modaal closeModal={closeModel} isVisible={isVisible} />
    <TouchableOpacity onPress={()=> setIsVisible(true)}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{ width: 60, height: 60, borderRadius: 400 / 2 }}
      />
      <Text style={{ marginLeft: 15 }}>{props.item.name}</Text>
    </TouchableOpacity>
    </View>
  );
}

export default CircularImage;
