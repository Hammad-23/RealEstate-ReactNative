import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  I18nManager,
  AsyncStorage,
  Share,
  Clipboard,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Item } from "react-navigation-header-buttons";

import {
  Avatar,
  Divider,
  TouchableHighlight,
  Box,
  Text,
  PrimaryButton,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { User } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { AuthService, ProfileService } from "../../services";
import { Theme } from "../../theme";

export const ProfileScreen = () => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const authContext = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState<User>(authContext.user);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (authContext.isLoggedIn) {
      ProfileService.getUserInfo().then((user) => {
        setUserInfo(user);
      });
    }
    getUrl();
  }, [authContext.isLoggedIn]);

  const onPressMenuItemClick = (item: any) => {
    if (item.navigateToScreen) {
      navigation.navigate(item.navigateToScreen);
    }
  };
  const getUrl = async () => {
    const url = await AsyncStorage.getItem("url");
    setUrl(url);
  };
  const onShare = async (text) => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onPressChangeImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          getString("Permissions"),
          getString("PermissionDenied"),
          [
            {
              text: getString("GoToSettings"),
              onPress: () => Linking.openURL("app-settings:"),
            },
            { text: getString("Cancel") },
          ],
          { cancelable: false }
        );

        return;
      }
    }
    try {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (result.cancelled) {
        return;
      }
      const imageName = await ProfileService.updateProfileImage(result.uri);
      setUserInfo({
        ...userInfo,
        imageName,
      });
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  return (
    <SafeAreaView style={styles.flex1} forceInset={{ top: "always" }}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.imageContent}>
          <Avatar
            style={styles.avatarContainerStyle}
            imageStyle={styles.avatarImageStyle}
            source={{
              uri: getImageUrl(userInfo.imageName),
            }}
          />
          <TouchableOpacity
            style={styles.changeImageButton}
            onPress={onPressChangeImage}
          >
            <Box style={styles.changeImageButtonBox}>
              <Ionicons
                name="md-refresh"
                size={18}
                color={Theme.colors.primaryColor}
                style={{ marginTop: 2 }}
              />
            </Box>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.nameText}
        >{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
        <Text style={styles.daysText}>{userInfo.username}</Text>
        <View style={{ marginTop: 24 }}>
          {[
            {
              title: getString("Favorite Properties"),
              subtitle: getString("Liked Properties"),
              iconName: "ios-heart",
              iconColor: "#EB5757",
              navigateToScreen: NavigationNames.LikedPropertiesScreen,
            },
            {
              title: getString("Notifications"),
              subtitle: getString("Show All Notifications"),
              iconName: "md-notifications",
              iconColor: "#F2994A",
            },
            {
              title: getString("Donation"),
              subtitle: url,
              iconName: "ios-egg",
              iconColor: Theme.colors.primaryColor,
              button: true,
            },
            {
              title: getString("Menu 2"),
              subtitle: "short desc",
              iconName: "ios-egg",
              iconColor: "#2D9CDB",
            },
            {
              title: getString("Menu 3"),
              subtitle: "short desc",
              iconName: "ios-egg",
              iconColor: "#27AE60",
            },
          ].map((item, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => onPressMenuItemClick(item)}
              >
                <View>
                  <View style={styles.menuRowContent}>
                    <View style={styles.iconContent}>
                      <Ionicons
                        name={item.iconName}
                        size={26}
                        color={item.iconColor}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                    <View style={styles.menuRowsContent}>
                      <Text style={styles.menuRowTitle}>{item.title}</Text>
                      <Text style={styles.menuRowSubtitle}>
                        {item.subtitle}
                      </Text>
                      {item.button ? (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginTop: 3,
                          }}
                        >
                          <PrimaryButton
                            onPress={() => Linking.openURL(item.subtitle)}
                            title={getString("Open")}
                          />
                          <PrimaryButton
                            onPress={() => Clipboard.setString(item.subtitle)}
                            title={getString("Copy")}
                          />
                          <PrimaryButton
                            onPress={() => onShare(item.subtitle)}
                            title={getString("Share")}
                          />
                        </View>
                      ) : (
                        <Text></Text>
                      )}
                    </View>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color={Theme.colors.primaryColor}
                      style={{
                        alignSelf: "center",
                        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                      }}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageContent: { alignSelf: "center", marginTop: 36 },
  avatarContainerStyle: {
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.75,
    overflow: "hidden",
  },
  avatarImageStyle: {
    width: 130,
    height: 130,
  },
  changeImageButton: {
    width: 28,
    height: 28,
    position: "absolute",
    bottom: -4,
    right: -4,
    zIndex: 10,
    borderRadius: Theme.sizes.boxBorderRadius,
    backgroundColor: "white",
  },
  changeImageButtonBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontFamily: "default-medium",
    marginTop: 16,
    color: Theme.colors.black,
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black,
  },
  menuRowContent: {
    flexDirection: "row",
    paddingStart: 12,
    paddingEnd: 16,
    paddingVertical: 16,
  },
  iconContent: {
    width: 32,
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 17,
    textAlign: "justify",
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "justify",
  },
  divider: { marginStart: 46 },
});
