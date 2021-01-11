import React, { useState } from "react";
import { Dimensions } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const WIDTH = Dimensions.get("screen").width;
import ReactNativeModal from "react-native-modal";

export function Modal(props) {
  const [visbleModal, setVisble] = useState(false);
  const isVisible=()=>{
      setVisble(!visbleModal)
  }
  return (
    <ReactNativeModal
      isVisible={visbleModal}
      style={{ margin: 16 }}
      backdropOpacity={0.5}
      swipeDirection="down"
      onSwipeComplete={() => isVisible()}
    >
      <SafeAreaView
        forceInset={{ top: "always", bottom: "always" }}
      ></SafeAreaView>
    </ReactNativeModal>
  );
}
