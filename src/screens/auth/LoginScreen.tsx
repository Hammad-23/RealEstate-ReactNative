import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity,AsyncStorage,View,Image } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const secondaryColor = "#a78e50";

import {
  HeaderLine,
  PrimaryButton,
  Separator,
  TextInput,
  KeyboardView,
  Text,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { AuthService } from "../../services";

export const LoginScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = () => {
    if (username === "" || password === "") {
      Alert.alert(getString("Required Login Inputs"));
      return;
    }
    AuthService.login(username, password)
      .then(async (user) => {
        await authContext.login(user);
        navigation.navigate(NavigationNames.mainScreen);
      })
      .catch((e) => Alert.alert(e.message));
  };

  const onClickRegister = () => {
    navigation.navigate(NavigationNames.RegisterScreen);
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={styles.topView}>

      </View>
      <HeaderLine />
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.stuff}>
          <View >
        <Image
              source={require("../../../assets/chlogo.png")}
              resizeMode="center"
              style={{
                width: 200,
                height: 150,
              }}
            />
            {/* <Text style={styles.logoSaying}>Champion Lender</Text> */}
            </View>
            <Separator height={32} />
          <Text style={styles.titleText}>{getString("Welcome! Please enter your email and password to login to your account")}</Text>
         <View style={styles.mid}>
          <TextInput

          
          
            inputProps={{
              placeholder: getString("Username"),
              value: username,
              onChangeText: setUsername,
              
              
            }}
          />
          </View>
          <Separator height={16} />
          <View style={styles.mid}>
          <TextInput
            inputProps={{
              placeholder: getString("Password"),
              secureTextEntry: true,
              textContentType: "none",
              autoCorrect: false,
              value: password,
              onChangeText: setPassword,
            }}
          />
          </View>
          <Separator height={32} />
          <View style={styles.btn}>
          <PrimaryButton
            title={getString("LOGIN_UPPER")}
            onPress={onClickLogin}
          />
          </View>
          <Separator height={8} />
          <Text style={{color: 'green'}}>If you dont have an account</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onClickRegister}
          >
            <Text style={styles.registerButtonTitle}>
              {getString("REGISTER_UPPER")}
            </Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardView>
      <View style={styles.BottomView}>

</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3d6e0",
    justifyContent: "center",
    
  },
  topView: {
    height:'10%',
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
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 15,
    fontFamily: "default-light",
    color: 'green',
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
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
  registerButtonTitle: { color: 'green' },
});
