import React, {  useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text } from "../../components/text";
import { NavigationNames } from "../../navigations";
import styles from "./styles";
import {Model} from './modal.js'

interface Props {
  navigation: any;
}

export const LandingPage = (props: Props) => {
  const [isVisible, setIsVisible]= useState(false)
  const closeModel=()=>{
    setIsVisible(false)
  }
  //   useEffect(()=>{
  // AsyncStorage.clear()
  //   },[])
  const iconsData = [
    {
      title: "House Match",
      image: require("../../../assets/landing_screen_assets/house-match.png"),
    },
    {
      title: "Credit Road Map",
      image: require("../../../assets/landing_screen_assets/credit-road-map.png"),
    },
    {
      title: "Piggy Bank",
      image: require("../../../assets/landing_screen_assets/piggy-bank.png"),
    },
    {
      title: "Ask an Expert",
      image: require("../../../assets/landing_screen_assets/ask-an-expert.png"),
    },
    {
      title: "Design Game",
      image: require("../../../assets/landing_screen_assets/design-game.png"),
    },
  ];

  const onMenuPressed = (item) => {
    if (item.title === iconsData[0].title) {
      props.navigation.navigate(NavigationNames.RootScreen);
    } else if (item.title === iconsData[2].title) {
      props.navigation.navigate(NavigationNames.FormScreen);
    } else if (item.title === iconsData[1].title) {
      props.navigation.navigate(NavigationNames.roadMap);
    } else if (item.title === iconsData[3].title) {
      props.navigation.navigate(NavigationNames.askAnExpert);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.headerBgImage}
          source={require("../../../assets/header_bg.jpg")}
        >
          <View style={styles.headerOpacityContainer}>
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
        </ImageBackground>
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>TIP OF THE DAY</Text>
        <View style={styles.tipSayingContainer}>
          <Text style={styles.tipText}>
            Refinance your mortgage, explore your options to refinance to get a
            lower interest rate which could save you thousands
          </Text>
        </View>
      </View>

      <View style={styles.pushing}>
        <View style={styles.imageHorizontalContainer}>
          <TouchableOpacity
            onPress={() => {
              onMenuPressed(iconsData[0]);
            }}
          >
            <Image source={iconsData[0].image} style={styles.menuIconImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onMenuPressed(iconsData[1]);
            }}
          >
            <View>
              <Image source={iconsData[1].image} style={styles.menuIconImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            onMenuPressed(iconsData[2]);
          }}
        >
          <View>
            <Image
              source={iconsData[2].image}
              style={[styles.menuIconImage, { alignSelf: "center" }]}
            />
          </View>
        </TouchableOpacity>
        </View>
      

        <View style={styles.imageHorizontalContainerSecond}>
          <TouchableOpacity     onPress={() => {
              onMenuPressed(iconsData[3]);
            }} >
            <View>
              <Image source={iconsData[3].image} style={styles.menuIconImage} />
            </View>
          </TouchableOpacity>
          <Model closeModal={closeModel} isVisible={isVisible} />
            <View>
              <TouchableOpacity  onPress={()=> setIsVisible(true)} >
          <Image source={iconsData[4].image} style={styles.menuIconImage} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.lastBorder}>
                
      </View>
    </ScrollView>
  );
};
