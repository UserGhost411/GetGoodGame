import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { marginTop, style } from "styled-system";
const win = Dimensions.get("window");
const DetailGiveAway = ({ route }) => {
  const [getHasil, setHasil] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  async function fetchInfo(id) {
    try {
      setLoading(true);
      const retraw = await fetch(`https://www.gamerpower.com/api/giveaway?id=${id}`);
      const retjson = await retraw.json();
      retjson.instructions_a = [];
      retjson.check = {};
      for (const iter of retjson.instructions.split("\r\n")) {
        retjson.instructions_a.push(
          <View key={iter} style={styles.adds}>
            <View style={{ flex: 1 }}>
              <Text style={styles.addbtn}>{iter.split(". ")[0].trim()}</Text>
            </View>
            <Text style={{ color: "white", flex: 7, fontWeight: "bold", height: 40, textAlignVertical: "center", width: "100%", marginLeft: 3, }}>{iter.split(". ")[1].trim()}</Text>
          </View>
        );
      }
      const platforms = retjson.platforms;
      retjson.check.isPc = platforms.includes("PC")
      retjson.check.isSteam = platforms.includes("Steam")
      retjson.check.isXbox = platforms.includes("Xbox")
      retjson.check.isAndroid = platforms.includes("Android")
      retjson.check.isApple = platforms.includes("iOS")
      retjson.check.isPS = platforms.includes("Playstation")
      retjson.check.isNitendo = platforms.includes("Nintendo")
      retjson.check.worth = parseFloat(retjson.worth.replace("$", "").replace("N/A", "0"))
      setHasil(retjson);
    } catch (error) {
      console.log(error)
      setHasil(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchInfo(route.params.key)
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#36393f", }}>
      {
        isLoading ? (
          <View style={{ backgroundColor: "#36393f", justifyContent: "center", flex: 1, }}><ActivityIndicator size="large" color="#dcddde" /></View>
        ) : (
          getHasil == null ? (
            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }} >
              <Image source={require("../assets/error.png")} resizeMode={"stretch"} style={{ aspectRatio: 1, height: 250 }} />
              <Text style={{ fontSize: 24, color: 'white', textAlign: "center", width: "100%", }}>Error while connecting to API </Text>
            </View>
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <ImageBackground source={{ uri: (getHasil.thumbnail ? getHasil.thumbnail : route.params.meta.thumbnail) }} resizeMode="stretch" style={styles.cover} imageStyle={styles.image}>
                  {/* <View style={styles.containerMenu}>
                    <Text style={[styles.cardTitle, { padding: 10, paddingBottom: 5, }]}>{getHasil.title}</Text>
                    <Text style={[styles.cardSubtitle, { padding: 10, paddingTop: 0, }]}>By {getHasil.type}</Text>
                  </View> */}
                </ImageBackground>
                <View style={styles.containerContent}>
                  <Text style={[styles.cardTitle, { padding: 0, paddingBottom: 5, fontSize: 18 }]}>{getHasil.title}</Text>
                  <View style={styles.badgePlatformView}>
                    {(getHasil.check.isPc) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#00a2ed' }} name="logo-windows" size={17} /> PC</Text></View>) : (<View></View>)}
                    {(getHasil.check.isSteam) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#fff' }} name="logo-steam" size={17} /> Steam</Text></View>) : (<View></View>)}
                    {(getHasil.check.isXbox) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#6ba66b' }} name="logo-xbox" size={17} /> Xbox</Text></View>) : (<View></View>)}
                    {(getHasil.check.isAndroid) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#fff' }} name="logo-google-playstore" size={17} /> Android</Text></View>) : (<View></View>)}
                    {(getHasil.check.isApple) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#1cc0fb' }} name="logo-apple-appstore" size={17} /> IOS</Text></View>) : (<View></View>)}
                    {(getHasil.check.isPS) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#fff' }} name="logo-playstation" size={17} /> PS</Text></View>) : (<View></View>)}
                    {(getHasil.check.isNitendo) ? (<View style={styles.badgePlatform}><Text style={styles.badgeText}><Ionicons style={{ color: '#e70009' }} name="game-controller-outline" size={17} /> Nintendo</Text></View>) : (<View></View>)}
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 5, width: '100%' }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, color: '#21cb78', fontWeight: 'bold' }}>FREE </Text>
                    <Text numberOfLines={1} style={{ fontSize: 16, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#ccc' }}>{getHasil.worth}</Text>

                    <Text numberOfLines={1} style={[styles.badgeType, { marginLeft: 'auto', backgroundColor: '#5bc0de', color: 'white', }]}>{getHasil.type}</Text>
                    <Text numberOfLines={1} style={[styles.badgeType, { marginLeft: 5, backgroundColor: '#555557', color: 'white', }]}><Ionicons style={{color:'#ccc'}} name="people-outline" size={15}/> {getHasil.users}+</Text>
                    <Text numberOfLines={1} style={[styles.badgeType, { marginLeft: 5, backgroundColor: (getHasil.check.worth > 5) ? ((getHasil.check.worth > 10) ? ((getHasil.check.worth > 20) ? '#ff8000' : '#a335ee') : '#0070dd') : '#62c462', color: 'white' }]}>{(getHasil.check.worth > 5) ? ((getHasil.check.worth > 10) ? ((getHasil.check.worth > 20) ? 'Legendary' : 'Epic') : 'Rare') : 'Uncommon'}</Text>
                  </View>
                  <Text style={[styles.title, { paddingTop: 15, paddingBottom: 5, }]}><Ionicons name="book-outline" size={17} /> Description</Text>
                  <Text style={{ color: "white", textAlign: "justify" }}>{getHasil.description}</Text>
                  <Text style={[styles.title, { paddingTop: 15, paddingBottom: 5, }]}><Ionicons name="reorder-four-outline" size={17} /> Instructions</Text>
                  {getHasil.instructions_a}
                  <TouchableOpacity style={styles.claimbtn, [{ marginTop: 20, padding: 0, }]} onPress={() => Linking.openURL(getHasil.open_giveaway_url).catch((err) => console.error("Error", err))}>
                    <Text style={[styles.claimbtn,{backgroundColor:(getHasil.status=="Active")?'#4285F4':'#5d6675'}]}>
                      {(getHasil.status=="Active")?'Claim Giveaway':'Giveaway Closed'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.title, { paddingTop: 15, paddingBottom: 5, }]}><Ionicons name="calendar-outline" size={17} /> Schedule</Text>
                  <Text style={{ color: "white"}}>Started at</Text>
                  <Text style={{ color: "white"}}>Ended at {getHasil.end_date}</Text>
                </View>
              </View>
            </ScrollView>)
        )
      }
    </View>
  );
};
export default DetailGiveAway;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 0,
    backgroundColor: "#36393f",
  },
  badgeType: {
    marginTop: 3,
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  containerContent: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    flex: 1,
    backgroundColor: "#36393f",
    marginTop: 0,
  },
  badgeText:{
    textAlignVertical:'top',
    color:'#cacbcf',
    fontSize:14,
  },
  adds: {
    flexDirection: "row",
    marginLeft: 12,
    marginTop: 8,
  },
  badgePlatformView:{
    width:'100%',
    paddingLeft:0,
    paddingRight:8,
    fontSize: 15,
    padding:2,
    flexDirection: "row", 
  },
  badgePlatform: {
    padding:3,
    borderRadius:5,
    marginRight:5,
    marginTop:5,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  claimbtn: {
    padding: 12,
    textAlign: 'center',
    borderRadius: 10,
    color: '#fff',
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: -45, },
    shadowColor: "#fff",
    fontSize: 16
  },
  addbtn: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    fontSize: 29,
    fontWeight: 'bold',
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 100,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardFooterMenu: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 0.6,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: "600",
    color: "white",
    fontSize: 15,
    borderColor: "rgba(30, 30, 30,0.3)",
    borderTopWidth: 1,

  },
  cardFooter: {
    flexDirection: "row",

    backgroundColor: "#4f545c",
    shadowColor: "#000",
    color: "white",
    shadowOffset: { width: 0, height: -4, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerMenu: {
    margin: 30,
    marginTop: 200 - 40,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: "rgba(66,133,244,1)",
  },
  header: {
    fontSize: 15,
    fontWeight: "600",

  },
  cover: {
    width: "100%",
    flex: 1,
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  cardSubtitle: {
    fontSize: 15,
    color: "white",
  }
});
