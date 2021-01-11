import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StatusBar, AsyncStorage } from "react-native";

import {
  AuthenticationProvider,
  LikedPropertiesProvider,
  AuthenticationContextType,
} from "../context";
import { User } from "../models";
import { LoadingLayout, LoadingManager } from "../presentation";
import AuthNavigator from "./AuthNavigator";
import HomePageTabNavigator from "./HomePageTabNavigator";
import NavigationNames from "./NavigationNames";
import { Form } from "../screens/form/formScreen";
import { LandingPage } from "../screens/landing/LandingPage";
import { RoadMap } from "../screens/roadMap/roadMap";
import { AgenList } from "../screens/askAnExpert/index.js";

const RootStack = createStackNavigator();

export default function () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.multiGet(["AccessToken", "User"]).then((response) => {
      const _accessToken = response[0][1];
      const _user = response[1][1];

      if (_accessToken && _user) {
        axios.defaults.headers["Authorization"] = "Bearer " + _accessToken;
        setUser(JSON.parse(_user));
      }
    });
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthenticationProvider user={user}>
        <LikedPropertiesProvider>
          <NavigationContainer
        
            theme={{
              dark: false,
              colors: {
                background: "rgb(255, 255, 255)",
                border: "rgb(224, 224, 224)",
                card: "rgb(255, 255, 255)",
                primary: "rgb(0, 122, 255)",
                text: "rgb(28, 28, 30)",
              },
            }}
          >
            <RootStack.Navigator
              screenOptions={{ headerShown: false }}
              mode="modal"
            >
              {user ? (
                <RootStack.Screen
                  name={NavigationNames.RootLoginScreen}
                  options={{header:null}}
                  component={AuthNavigator}
                />
              ) : (
                <RootStack.Screen
                   
                  name={NavigationNames.landingScreen}
                  component={LandingPage}
                />
              )}
              <RootStack.Screen
                name={NavigationNames.mainScreen}
                component={LandingPage}
              />

              <RootStack.Screen
                name={NavigationNames.FormScreen}
                component={Form}
              />
              <RootStack.Screen
                name={NavigationNames.RootScreen}
                component={HomePageTabNavigator}
              />
              <RootStack.Screen
                name={NavigationNames.roadMap}
                component={RoadMap}
              />
              <RootStack.Screen
                name={NavigationNames.askAnExpert}
                component={AgenList}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </LikedPropertiesProvider>
      </AuthenticationProvider>
      <LoadingLayout ref={(ref) => LoadingManager.setLoadingView(ref)} />
    </>
  );
}
