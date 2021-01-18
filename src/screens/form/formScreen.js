import React, { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Clipboard,
  Linking,
  Image,
  View,
  AsyncStorage,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const WIDTH = Dimensions.get("screen").width;
const height = Dimensions.get("window").height;

import RangeSlider, { Slider } from "react-native-range-slider-expo";

import {
  HeaderLine,
  PrimaryButton,
  Separator,
  TextInput,
  KeyboardView,
  Text,
  HtmlView,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { donationHouse } from "../../services/DonationService";
import { Theme } from "../../theme";
import ReactNativeModal from "react-native-modal";

export const Form = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);
  const { getString } = useLocalization();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const submitDonation = async () => {
    try {
      const respons = await donationHouse(amount, description);
      setResponse(respons.url);
      if (respons.url) {
        setSubmitModal(true);
        await AsyncStorage.setItem("url", respons.url);
        return;
      }
      alert("Already exsist");
    } catch (e) {
      console.log(e);
    }
    // .then((response) => {
    //   setResponse();
    //   console.log(response)
    //   AsyncStorage.setItem('Url',response)

    // })
  };

  const images = [
    {
      source: {
        uri:
          "http://www.punjabdevelopers.com/wp-content/uploads/2017/08/modern-house-property.jpg",
      },
    },
    {
      source: {
        uri:
          "https://profit.pakistantoday.com.pk/wp-content/uploads/2020/08/Rest-house-generic-feature-696x391.jpg",
      },
    },
    {
      source: {
        uri:
          "http://www.punjabdevelopers.com/wp-content/uploads/2017/08/modern-house-property.jpg",
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.headerBgImage}
          imageStyle={{ borderRadius: 6}}          source={require("../../../assets/header_bg.jpg")}
        >
          <View style={styles.headerOpacityContainer}>
            <Image
              source={require("../../../assets/chlogo.png")}
              resizeMode="center"
              style={{
                width: 150,
                height: 100,
              }}
            />
            {/* <Text style={styles.logoSaying}>Champion Lender</Text> */}
          </View>
        </ImageBackground>
      </View>
      <View>
        <RangeSlider
          min={1}
          max={5}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={1}
          styleSize="small"
          toKnobColor={Theme.colors.primaryColor}
          fromKnobColor={Theme.colors.primaryColor}
          inRangeBarColor="rgba(14, 96, 80, 0.85)"
          outOfRangeBarColor={Theme.colors.primaryColor}
        />
      </View>

      {/* <HeaderLine /> */}
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {/* <Separator height={2} /> */}
          <View style={styles.stuff}>
            <View style={styles.row}>
              {/* <Text style={styles.titleText}>{getString("House Price ")}</Text> */}
              <Text style={{ color: "green", fontSize: 20, fontWeight: "300" }}>
                {getString("Amount of Donation?")}
              </Text>
            </View>
            <Separator height={32} />

            <View style={styles.mid}>
              {/* <Text style={styles.donation}>Donation Amount:</Text> */}
              <Separator height={2} />
              <TextInput
                inputProps={{
                  placeholder: getString("Donation Amount"),
                  keyboardType: "number-pad",
                  onChangeText: setAmount,
                }}
              />
            </View>
            <Separator height={6} />
            <View style={styles.mid}>
              {/* <Text style={styles.donation}>Description:</Text> */}
              <Separator height={2} />
              <TextInput
                // style={{padding:40}}

                style={{ height: 200 }}
                inputProps={{
                  placeholder: getString("Description..."),
                  onChangeText: setDescription,
                }}
              />
            </View>
            <Separator height={8} />
            <View style={styles.btn}>
              <PrimaryButton
                title={getString("SUBMIT")}
                onPress={submitDonation}
              />
            </View>
          </View>
          <ReactNativeModal
            isVisible={submitModal}
            style={{ margin: 16 }}
            backdropOpacity={0.5}
            swipeDirection="down"
            onSwipeComplete={() => setSubmitModal(false)}
          >
            <SafeAreaView forceInset={{ top: "always", bottom: "always" }}>
              <ScrollView
                style={styles.modalContainer}
                contentContainerStyle={styles.modalContentContainer}
              >
                <HtmlView
                  htmlContent={response}
                  imagesMaxWidthOffset={WIDTH - 32}
                />
                <SafeAreaView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={styles.ClipboardButton}
                    onPress={() => {
                      Linking.openURL(response);
                      setSubmitModal(false);
                    }}
                  >
                    <Text style={styles.text}>Open</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ClipboardButton}
                    onPress={() => {
                      Clipboard.setString(response);
                      setSubmitModal(false);
                    }}
                  >
                    <Text style={styles.text}>Copy</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </ScrollView>
            </SafeAreaView>
          </ReactNativeModal>
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3d6e0",
    justifyContent: "center",
  },
  slider: {
    position: "absolute",
    marginTop: height * 0.57,
    width: height * 0.67,
    transform: [{ rotateZ: "-90deg" }],
    marginLeft: 125,
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "default-light",
    color: "black",
    // marginBottom: 24,
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
  header: {
  
    height: "30%",
    width: "100%",
  },
  btn: {
    width: 150,
  },
  stuff: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  donation: {
    fontSize: 17,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBgImage: {
    width: "100%",
    height: "100%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35, overflow: 'hidden'
  },
  headerOpacityContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(14, 96, 80, 0.85)",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },

  text: { color: "white", fontSize: 16, fontFamily: "default-medium" },
});
