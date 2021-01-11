import React, { useEffect, useState } from "react";
import { agentListService } from "../../services/agentListService";
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import { DividerV2 } from "../../components/dividerV2/index";

export const AgenList = () => {
  const [AgenList, setAgentList] = useState([]);
  useEffect(() => {
    getAgent();
  }, []);
  const getAgent = async () => {
    const get = await agentListService();
    setAgentList(get);
    return get;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ marginTop: "10%" }}>
        <View style={styles.headerContainer}>
          <Text style={styles.textContainer}>Ask an expert</Text>
        </View>

        {AgenList.map((item, index) => (
          <View key={index}>
            <DividerV2 item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: "10%",
  },
  divider: {
    height: "30%",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    fontSize: 30,
    fontFamily: "default-light",
    color: "green",
  },
});
