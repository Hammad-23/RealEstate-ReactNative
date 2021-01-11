import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert, Dimensions,View,Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import SafeAreaView from "react-native-safe-area-view";
const secondaryColor = "#a78e50";

import {
  TextInput,
  Separator,
  PrimaryButton,
  HeaderLine,
  KeyboardView,
  Text,
  CheckBox,
  HtmlView,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import { AuthService, AppSettingsService } from "../../services";
import { Theme } from "../../theme";

const WIDTH = Dimensions.get("screen").width;

export const RegisterScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userTermsShowModal, setUserTermsShowModal] = useState(false);
  const [userTermsText, setUserTermsText] = useState("");
  const [userTermsConfirm, setUserTermsConfirm] = useState(false);

  const onClickBackToLogin = () => navigation.goBack();

  const onClickRegister = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === ""
    ) {
      Alert.alert(getString("Please fill fields"));
      return;
    }
    if (!userTermsConfirm) {
      Alert.alert(getString("You must confirm user terms!"));
      return;
    }

    AuthService.register(firstName, lastName, email, username, password)
      .then(async (user) => {
        await authContext.login(user);
        // x2 goback for first and register screens.
        navigation.goBack();
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  useEffect(() => {
    AppSettingsService.getUserTerms().then((res) =>
      setUserTermsText(res.data.userTerms)
    );
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
 <View style={styles.topView}>

      </View>
        <KeyboardView style={styles.content}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.stuff}>
          <View>
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
            <Separator height={16} />
            <Text style={styles.titleText}>Register Here</Text>
            <View style={styles.mid}>
            <TextInput
              inputProps={{
                placeholder: getString("First Name"),
                value: firstName,
                onChangeText: setFirstName,
              }}
            />
            </View>
            <Separator height={4} />
            <View style={styles.mid}>
            <TextInput
              inputProps={{
                placeholder: getString("Last Name"),
                value: lastName,
                onChangeText: setLastName,
              }}
            />
            </View>
            <Separator height={4} />
            <View style={styles.mid}>
            <TextInput
              inputProps={{
                placeholder: getString("Email"),
                value: email,
                onChangeText: setEmail,
              }}
            />
            </View>
            <Separator height={4} />
            <View style={styles.mid}>
            <TextInput
              inputProps={{
                placeholder: getString("Username"),
                value: username,
                onChangeText: setUsername,
              }}
            />
            </View>
            <Separator height={4} />
            <View style={styles.mid}>
            <TextInput
              inputProps={{
                placeholder: getString("Password"),
                secureTextEntry: true,
                value: password,
                onChangeText: setPassword,
              }}
            />
            </View>
            <Separator height={16} />
            <View>
            <CheckBox
            
              text={getString("UserTermConfirmText")}
              isChecked={userTermsConfirm}
              onPress={() => {
                if (userTermsConfirm) setUserTermsConfirm(false);
                else setUserTermsShowModal(true);
              }}
              style={{ marginStart: 4 }}
            />
            </View>
            <Separator height={16} />
            <View style={styles.btn}>
            <PrimaryButton
              title={getString("REGISTER_UPPER")}
              onPress={onClickRegister}
            />
            </View>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={onClickBackToLogin}
            >
              <Text style={styles.registerButtonTitle}>
                {getString("Back to Login")}
              </Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardView>
        <HeaderLine />
        <View style={styles.BottomView}>

</View>
      </SafeAreaView>
      <ReactNativeModal
        isVisible={userTermsShowModal}
        style={{ margin: 16 }}
        backdropOpacity={0.5}
        swipeDirection="down"
        onSwipeComplete={() => setUserTermsShowModal(false)}
      >
        <SafeAreaView forceInset={{ top: "always", bottom: "always" }}>
          <ScrollView
            style={styles.modalContainer}
            contentContainerStyle={styles.modalContentContainer}
          >
            <HtmlView
              htmlContent={userTermsText}
              imagesMaxWidthOffset={WIDTH - 32}
            />
            <PrimaryButton
              title={getString("CONFIRM")}
              onPress={() => {
                setUserTermsShowModal(false);
                setUserTermsConfirm(true);
              }}
            />
          </ScrollView>
  
        </SafeAreaView>
   
      </ReactNativeModal>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3d6e0'
  },
  topView: {
    height:'5%',
    width:'100%',
    borderBottomLeftRadius:35,
    borderBottomRightRadius:35,
    backgroundColor:'rgba(14, 96, 80, 0.85)'
  },
  BottomView: {
    height:'10%',
    width:'100%',
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    backgroundColor:'rgba(14, 96, 80, 0.85)'
  },
  content: {
   marginTop:2
  },
  contentContainerStyle: {
   marginTop:5,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "default-light",
    color: 'green',
    marginBottom: 24,
    // marginLeft:110
    
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  registerButtonTitle: { color: 'green'},
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  modalContentContainer: {
    padding: 16,
  },
  box:{
    width: 250,
    marginLeft:40
  },
  logoSaying: {
    color: secondaryColor,
    fontSize: 25,
    fontFamily: "default-medium",
    marginTop: 20,
  },
   mid:{
    width:250
  },
  btn:{
    width:150

  },
  stuff:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
});
