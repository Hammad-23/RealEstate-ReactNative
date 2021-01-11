import React, { useState } from "react";

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from "react-native";

export function Modaal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View>
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ width: 60, height: 60, borderRadius: 400 / 2 }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 20,
                }}
              >
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View>
                      <Text>Name:</Text>
                    </View>
                    <View style={{ marginLeft: 8 }}>
              <Text style={{ color: "green" }}>{props?.item?.username||"-"}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <View>
                      <Text>Number:</Text>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                  <Text style={{ color: "green" }}>{props?.item?.phoneNumber||"-"}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <View>
                      <Text>Zip code:</Text>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                      <Text style={{ color: "green" }}>123456</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* <Text style={styles.modalText}>Your Model has been created</Text> */}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View>
                <TouchableHighlight
                  style={{ ...styles.openButtton, backgroundColor: "green" }}
                  onPress={() => {
                    props.closeModal();
                    // setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Chat</Text>
                </TouchableHighlight>
              </View>

              <View style={{ marginLeft: 40 }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    props.closeModal();
                    // setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    width:80
  },
  openButtton: {
    backgroundColor: "green",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    width:80
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
