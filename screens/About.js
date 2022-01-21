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
            source={require("../assets/bgmini.png")}
            resizeMode="stretch"
            style={styles.bg}
            imageStyle={styles.bg_imageStyle}>
            <Image
              source={require("../assets/UGC.png")}
              resizeMode={"cover"}
              style={styles.user_photo}></Image>
            <Text style={styles.username}>UserGhost411</Text>
            <Text style={styles.subtitle}>Suka Makan Ayam Goreng</Text>
          </ImageBackground>
        </View>
      
        <View style={{flex:5,padding:10}}>
          <View style={styles.card}>
            <Text style={styles.menuTextTitle}>About</Text>
            <View style={{borderWidth:0.2,borderColor:"rgba(200,200,200,0.3)",marginBottom:5,marginTop:5,}}/>
            <Text style={[styles.menuTextSubtitle,{marginBottom:8}]}>Ubahlah Tampilan ini.{"\n\n\n"}JANGAN CUMAN TULISANNYA DOANG YA</Text>
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
    flex:2,
    flexDirection: "column",
    width: win.width,
  },
  bg: {
    flex:1,
    width: win.width,
  },
  bg_imageStyle: {},
  user_photo: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "rgba(200,200,200,0.3)",
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: (win.width/2)-(120/2)
  },
  username: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    width: win.width,
  },
  subtitle: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    color:"white",
    fontSize: 16,
    marginTop: 8,
    width: win.width,
  },
  menuTextSubtitle: {
    color:"white",
  },
  menu: {
    backgroundColor:"#4f545c",
    flexDirection: "row",
    marginBottom: 6,
    marginLeft: 3,
    color:"white",
    marginRight: 3,
    borderRadius: 5,
    alignItems: "center",
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
