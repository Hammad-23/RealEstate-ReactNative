import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import  RoadMapGif from '../../../assets/road-map.gif'
import { Theme } from "../../theme";

export const RoadMap = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={RoadMapGif}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3d6e0",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "default-light",
    color: "green",
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  registerButtonTitle: { color: Theme.colors.gray },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  modalContentContainer: {
    padding: 16,
  },
  ClipboardButton: {
    backgroundColor: Theme.colors.primaryColor,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: Theme.sizes.boxBorderRadius,
    borderColor: "white",
    borderWidth: 0,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    width: 100,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  mid: {
    width: 250,
  },
  btn: {
    width: 150,
  },
  stuff: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  text: { color: "white", fontSize: 16, fontFamily: "default-medium" },
});
