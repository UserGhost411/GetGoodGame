import React from "react";
import {
  Image,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Linking,
} from "react-native";
const win = Dimensions.get('window');
const About = ({ navigation }) => {
  return (
      <View style={styles.group}>
        <View style={styles.profile}>
          <ImageBackground
            source={require("../assets/bg-mini.png")}
            resizeMode="stretch"
            style={styles.bg}
            imageStyle={styles.bg_imageStyle}>
            <Image
              source={require("../assets/app-logo.png")}
              resizeMode={"cover"}
              style={styles.user_photo}></Image>
            <Text style={styles.username}>GetGoodGame</Text>
          </ImageBackground>
        </View>
      
        <View style={{flex:5,padding:10}}>
          <View style={styles.card}>
            <Text style={styles.menuTextTitle}>About</Text>
            <View style={{borderWidth:0.2,borderColor:"rgba(200,200,200,0.3)",marginBottom:5,marginTop:5,}}/>
            <Text style={[styles.menuTextSubtitle,{marginBottom:8}]}>Get Good Game Free From All Platform{"\n\n\n"}Follow this app to find free games to claim. Keep track of all giveaways in various platform. We search, find and gather all game free in one place so you don’t have to do anything but view and claim free games. Stay up to date with everything that digital game shops have to offer for free.</Text>
            <Text style={[styles.menuTextSubtitle,{marginBottom:8}]}>Thanks to GamerPower API & FreeToGame API for making this app capable to serving gamers need.{"\n\n\n"}You can check the API here :{"\n\n"}https://www.gamerpower.com/api-read{"\n"}https://www.freetogame.com/api-doc</Text>
          </View>
         
          
        </View>
      </View>

  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36393f",
  },
  card: {
    backgroundColor:"#4f545c",
    color:"white",
    padding:10,
    borderRadius:5,
    marginBottom:10
  },
  group: {
    width: win.width,
    height: win.height,
    flexDirection: "column",
    backgroundColor: "#36393f",
    alignSelf: "center"
  },
  profile: {
    flex:1.7,
    flexDirection: "column",
    width: win.width,
  },
  bg: {
    flex:1,
    width: win.width,
  },
  bg_imageStyle: {
  },
  user_photo: {
    width: 120,
    height: 120,
    // borderWidth: 2,
    // borderRadius: 100,
    // borderColor: "white",
    // backgroundColor: "red",
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: (win.width/2)-(120/2),
    // alignSelf: "center"
  },
  username: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -5,
    width: win.width,
  },
  subtitle: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    color:"white",
    fontSize: 16,
    marginTop: 8,
    width: win.width,
    marginBottom: 10,
  },
  menuTextSubtitle: {
    color:"white",
    textAlign: "justify"
  },
  menuText: {
    flex:2,
    color:"white",
  },
  menuTextTitle: {
    fontSize: 18,
    color:"white",
    marginBottom: 3,
    fontWeight: "bold",
  },
  menuIcon: {
    height:80,

    flex:1,
  },
});
