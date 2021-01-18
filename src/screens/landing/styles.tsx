import { StyleSheet } from "react-native";
const secondaryColor = "#a78e50";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#c3d6e0'
  },
  header: {
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    width: "100%",
    height: "30%",
   
    
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
    borderBottomLeftRadius: 35
   
  },
  logo: {},
  logoSaying: {
    color: secondaryColor,
    fontSize: 25,
    fontFamily: "default-medium",
    marginTop: 20,
  },
  tipContainer: {
    width: "100%",
    justifyContent: "center",
    height: "20%",
    paddingHorizontal: 15,
   
  },
  tipTitle: {
    fontSize: 25,
    color: "rgba(14, 96, 80, 1)",
    textAlign: "center",
    fontFamily: "default-bold",
    margin: 10,
  },
  tipSayingContainer: {
    borderColor: "rgba(14, 96, 80, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    backgroundColor:'white'
  },
  tipText: {
    color: secondaryColor,
    fontFamily: "default-regular",
  },

  menuIconContainer: {
    // backgroundColor: secondaryColor,
    height: 100,
    width: 120,
    // borderColor: "rgba(14, 96, 80, 1)",
    margin: 20,
    // borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconImage: {
    height: 100,
    width: 120,
    margin: 10,
    marginHorizontal: 30,
    resizeMode: "contain",
  },
  imageHorizontalContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
   
  },
  imageHorizontalContainerSecond: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center'
  },
  menuIconLabel: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "default-medium",
  },
  lastBorder: {
    height:'20%',
    width:'100%',
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    backgroundColor:'rgba(14, 96, 80, 0.85)'
  },
  pushing: {
    marginTop:30,
    marginBottom:40
  }
});

export default styles;
