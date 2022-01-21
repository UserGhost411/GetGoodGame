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
class GiveAways extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      isError: false,
    };
  }
  async fetchGiveAways() {
    try {
      const hasil = await fetch("https://www.gamerpower.com/api/giveaways");
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
    this.fetchGiveAways();
  }
  LayoutItem = ({ item }) => {
    const { navigation } = this.props;
    const platforms = item.platforms;
    const isPc = platforms.includes("PC")
    const isSteam = platforms.includes("Steam")
    const isXbox = platforms.includes("Xbox")
    const isAndroid = platforms.includes("Android")
    const isApple = platforms.includes("iOS")
    const isPS = platforms.includes("Playstation")
    const isNitendo = platforms.includes("Nintendo")
    const worth = parseFloat(item.worth.replace("$","").replace("N/A","0"))
    return (
      <>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailGiveAway", { key: item.id,meta: item })}>
          <View style={styles.cardContent}>
            <ImageBackground source={{ uri: item.thumbnail }} resizeMode="cover" style={styles.itemImage} imageStyle={styles.itemImage}>
            <View style={styles.badgePlatformView}>
                {(isPc)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#00a2ed'}} name="logo-windows" size={17}/></View>):(<View></View>)}
                {(isSteam)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#fff'}} name="logo-steam" size={17}/></View>):(<View></View>)}
                {(isXbox)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#6ba66b'}} name="logo-xbox" size={17}/></View>):(<View></View>)}
                {(isAndroid)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#fff'}} name="logo-google-playstore" size={17}/></View>):(<View></View>)}
                {(isApple)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#1cc0fb'}} name="logo-apple-appstore" size={17}/></View>):(<View></View>)}
                {(isPS)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#fff'}} name="logo-playstation" size={17}/></View>):(<View></View>)}
                {(isNitendo)?(<View style={styles.badgePlatform}><Ionicons style={{color:'#e70009'}} name="game-controller-outline" size={17}/></View>):(<View></View>)}

            </View>
            </ImageBackground>
            <View style={styles.cardText}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
              <View style={{ flexDirection: "row",marginTop:5,width:'100%'}}>
                <Text numberOfLines={1} style={{fontSize:16,color:'#21cb78',fontWeight:'bold'}}>FREE </Text>
                <Text numberOfLines={1} style={{fontSize:16,textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'#ccc'}}>{item.worth}</Text>
              
                <Text numberOfLines={1} style={[styles.badgeType,{marginLeft:'auto',backgroundColor:'#5bc0de',color:'white',}]}>{item.type}</Text>
                <Text numberOfLines={1} style={[styles.badgeType,{marginLeft:5,backgroundColor:(worth>5)?((worth>10)?((worth>20)?'#ff8000':'#a335ee'):'#0070dd'):'#62c462',color:'white'}]}>{(worth>5)?((worth>10)?((worth>20)?'Legendary':'Epic'):'Rare'):'Uncommon'}</Text>
              </View>
              <Text numberOfLines={2} style={{color:'#7a8288',marginBottom:5}}>{item.description}</Text>
              <View style={{ flexDirection: "row",width:'100%'}}>
                <Text numberOfLines={1} style={{color:'#ccc',fontSize:13}}> <Ionicons style={{color:'#ccc'}} name="people-outline" size={15}/> {item.users}+ Join this GiveAway</Text>
                <Text numberOfLines={1} style={{color:'#e36464',fontSize:13,marginLeft:'auto'}}>{ item.end_date }</Text>
              </View>
             
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
            keyExtractor={(data) => data.id+Math.random().toString()}
            renderItem={this.LayoutItem}
          />
          )
        )}
      </View>
    );
  }
}

export default GiveAways;

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
    borderRadius:5,
    paddingLeft:8,
    paddingRight:8,
    fontSize:13,
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
