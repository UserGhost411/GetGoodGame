import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
class FreeGames extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      isError: false,
    };
  }
  async fetchFreeGames() {
    try {
      const hasil = await fetch("https://www.freetogame.com/api/games");
      const json = await hasil.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
      this.setState({ isError:true,data:error });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.fetchFreeGames();
  }
  LayoutItem = ({ item }) => {
    const { navigation } = this.props;
    const platforms = item.platform;
    const isPc = platforms.includes("PC")
    const isBrowser = platforms.includes("Web Browser")
    return (
      <>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailFreeGame", { key: item.id,meta: item })}>
          <View style={styles.cardContent}>
            <ImageBackground source={{ uri: item.thumbnail }} resizeMode="cover" style={styles.itemImage} imageStyle={styles.itemImage}>
            <View style={styles.badgePlatformView}>
                {(isPc)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#00a2ed'}} name="logo-windows" size={17}/></View>):(<View></View>)}
                {(isBrowser)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#fff'}} name="globe-outline" size={17}/></View>):(<View></View>)}
            </View>
            </ImageBackground>
            <View style={styles.cardText}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
              <View style={{ flexDirection: "row",marginTop:5,width:'100%'}}>
                <Text numberOfLines={1} style={{fontSize:16,color:'#21cb78',fontWeight:'bold'}}>FREE </Text>
                <Text numberOfLines={1} style={[styles.badgeType,{marginLeft:'auto'}]}>{item.genre}</Text>
              </View>
              <Text numberOfLines={2} style={{color:'#7a8288',marginBottom:5}}>{item.short_description}</Text>
              
             
            </View>
         
          </View>
        </TouchableOpacity>
      </>
    );
  };
  
  render() {
    const { data, isLoading,isError } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#dcddde" />
        ) : (
          isError? (
            <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}} >
              
                <Image source={require("../assets/error.png")}resizeMode={"stretch"} style={{aspectRatio:1,height:250}} />
                <Text style={{fontSize:24,color:'white', textAlign:"center",width:"100%",}}>Error while connecting to API </Text>
            
            </View>
          ):(
            <FlatList
            style={styles.cardContainer}
            data={data}
            keyExtractor={(data) => data.id}
            numColumns={2} 
            renderItem={this.LayoutItem}
          />
          )
        )}
      </View>
    );
  }
}

export default FreeGames;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#36393f",
  },
  cardContainer:{
    paddingTop:10,
    paddingLeft:15,
    backgroundColor:"#36393f",
  },
  card: {
    width:'100%',
    paddingBottom:15,
    paddingRight: 15,
  },
  badgeType: {
    marginTop:3,
    backgroundColor:'#4799eb',
    color:'white',
    borderRadius:5,
    paddingLeft:5,
    paddingRight:5,
    fontWeight:'700',
  },
  badgePlatformView:{
    width:'100%',
    paddingLeft:8,
    paddingRight:8,
    fontSize: 15,
    padding:2,
    justifyContent:'flex-end',
    flexDirection: "row", 
  },
  badgePlatform: {
    padding:3,
    borderRadius:5,
    marginLeft:5,
    marginTop:5,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  cardContent: {
    backgroundColor:"#4f545c",
    borderRadius:10,
    flexDirection: "column", 
    alignItems: "flex-start",
    backgroundColor:"#4f545c",
    color:"white",
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 3,},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  itemBorder: {
    borderWidth: 0.5,
    borderColor: "#cccccc",
  },
  itemImage: {
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    width: "100%",
    height: 150,
  },
  cardText: {
    color:"white",
    padding:10,
    width: "100%",
  },
  cardFooter: {
    width: "100%",
    flexDirection:"row",
    borderRadius:10,
  },
  cardFooterMenu: {
    flex:1,
    backgroundColor:"#4f545c",
    textAlign: 'center',
    borderRightWidth: 0.6,
    paddingTop:8,
    color:"white",
    paddingBottom:8,
    fontWeight:"600",
    fontSize: 15,
    borderColor: "rgba(200, 200, 200,0.3)",
    borderTopWidth:0.6,
  },
  note: {
    borderRadius:10,
    borderBottomLeftRadius:0,
    paddingLeft:8,
    paddingRight:8,
    fontSize: 15,
    padding:2,
    fontWeight:"600",
    alignSelf: 'flex-start',
    backgroundColor: "rgba(66,133,244,0.7)",
  },
  itemTitle: {
    fontWeight: "bold",
    color:"white",
    fontSize: 20,
  },
  itemSubTitle: {
    marginTop: 5,
    color:"white",
    fontSize: 17,
  }
});
