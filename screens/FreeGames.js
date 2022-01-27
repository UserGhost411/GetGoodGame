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
import { HStack, ScrollView, Box } from "native-base";
import { Ionicons } from '@expo/vector-icons';
class FreeGames extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      isError: false,
      activeTags: ['all'],
      tags: [{ "tag": "All", "id": "all" }, { "tag": "MMORPG", "id": "mmorpg" }, { "tag": "Shooter", "id": "shooter" }, { "tag": "Strategy", "id": "strategy" }, { "tag": "MOBA", "id": "moba" }, { "tag": "Racing", "id": "racing" }, { "tag": "Sports", "id": "sports" }, { "tag": "Social", "id": "social" }, { "tag": "Sandbox", "id": "sandbox" }, { "tag": "Open-world", "id": "open-world" }, { "tag": "Survival", "id": "survival" }, { "tag": "Pvp", "id": "pvp" }, { "tag": "Pve", "id": "pve" }, { "tag": "Pixel", "id": "pixel" }, { "tag": "Voxel", "id": "voxel" }, { "tag": "Zombie", "id": "zombie" }, { "tag": "Turn-based", "id": "turn-based" }, { "tag": "First-person", "id": "first-person" }, { "tag": "Third-Person", "id": "third-Person" }, { "tag": "Top-down", "id": "top-down" }, { "tag": "Tank", "id": "tank" }, { "tag": "Space", "id": "space" }, { "tag": "Sailing", "id": "sailing" }, { "tag": "Side-scroller", "id": "side-scroller" }, { "tag": "Superhero", "id": "superhero" }, { "tag": "Permadeath", "id": "permadeath" }, { "tag": "Card", "id": "card" }, { "tag": "Battle-royale", "id": "battle-royale" }, { "tag": "Mmo", "id": "mmo" }, { "tag": "Mmofps", "id": "mmofps" }, { "tag": "MMOTPS", "id": "mmotps" }, { "tag": "3D", "id": "3d" }, { "tag": "2D", "id": "2d" }, { "tag": "Anime", "id": "anime" }, { "tag": "Fantasy", "id": "fantasy" }, { "tag": "Sci-fi", "id": "sci-fi" }, { "tag": "Fighting", "id": "fighting" }, { "tag": "Action-rpg", "id": "action-rpg" }, { "tag": "Action", "id": "action" }, { "tag": "Military", "id": "military" }, { "tag": "Martial-arts", "id": "martial-arts" }, { "tag": "Flight", "id": "flight" }, { "tag": "Low-spec", "id": "low-spec" }, { "tag": "Tower-defense", "id": "tower-defense" }, { "tag": "Horror", "id": "horror" }, { "tag": "Mmorts", "id": "mmorts" }]

    };
  }
  async fetchFreeGames(filter) {
    try {
      this.setState({ isLoading: true });
      const hasil = await fetch("https://www.freetogame.com/api/games" + ((filter[0] != 'all') ? `?tag=${filter.join('.')}` : ''));
      const json = await hasil.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
      this.setState({ isError: true, data: error });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.fetchFreeGames(['all']);
  }
  LayoutItem = ({ item }) => {
    const { navigation } = this.props;
    const platforms = item.platform;
    const isPc = platforms.includes("PC")
    const isBrowser = platforms.includes("Web Browser")
    return (
      <>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailFreeGame", { key: item.id, meta: item })}>
          <View style={styles.cardContent}>
            <ImageBackground source={{ uri: item.thumbnail }} resizeMode="cover" style={styles.itemImage} imageStyle={styles.itemImage}>
              <View style={styles.badgePlatformView}>
                {(isPc) ? (<View style={styles.badgePlatform}><Ionicons style={{ color: '#00a2ed' }} name="logo-windows" size={17} /></View>) : (<View></View>)}
                {(isBrowser) ? (<View style={styles.badgePlatform}><Ionicons style={{ color: '#fff' }} name="globe-outline" size={17} /></View>) : (<View></View>)}
              </View>
            </ImageBackground>
            <View style={styles.cardText}>
              <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
              <View style={{ flexDirection: "row", marginTop: 5, width: '100%' }}>
                <Text numberOfLines={1} style={{ fontSize: 16, color: '#21cb78', fontWeight: 'bold' }}>FREE </Text>
                <Text numberOfLines={1} style={[styles.badgeType, { marginLeft: 'auto' }]}>{item.genre}</Text>
              </View>
              <Text numberOfLines={2} style={{ color: '#7a8288', marginBottom: 5 }}>{item.short_description}</Text>


            </View>

          </View>
        </TouchableOpacity>
      </>
    );
  };
  checkActive = (id) => { //check apakah tombol kategory aktif atau tidak (hasil di tampilakn dalam bentuk bgcolor)
    const { activeTags } = this.state;
    return { backgroundColor: (activeTags.includes(id)) ? '#ff7800' : '#696969', }
  }
  changeCategory = (id) => { // fungsi yang digunakan dalam menganti active kategori yang ditampilkan
    let { activeTags } = this.state;
    if(id!="all"){
      if(activeTags.includes('all')) activeTags=[];
      if(activeTags.includes(id)){
        activeTags.splice(activeTags.indexOf(id),1);
      }else{
        activeTags.push(id)
      }
    }else{
      activeTags= ['all']
    }
    if(activeTags.length==0)activeTags=['all'];
    this.setState({ activeTags: activeTags });
    this.fetchFreeGames(activeTags);
  }
  render() {
    const { data, isLoading, isError,tags } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Box style={styles.CategoryContainer} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack>
              {tags.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => this.changeCategory(item.id)}>
                  <Text style={[styles.CategoryItem, this.checkActive(item.id)]}>{item.tag}</Text>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#dcddde" />
          ) : (
            isError ? (
              <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }} >

                <Image source={require("../assets/error.png")} resizeMode={"stretch"} style={{ aspectRatio: 1, height: 250 }} />
                <Text style={{ fontSize: 24, color: 'white', textAlign: "center", width: "100%", }}>Error while connecting to API </Text>

              </View>
            ) : (
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
      </View>
    );
  }
}

export default FreeGames;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#36393f",
  },
  CategoryContainer: {
    flex:0,
    backgroundColor: '#36393f',
  },
  CategoryItem: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 10,
    borderRadius: 30,
    color: "white",
    justifyContent: "center",
  },
  cardContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    backgroundColor: "#36393f",
  },
  card: {
    width: '100%',
    paddingBottom: 15,
    paddingRight: 15,
  },
  badgeType: {
    marginTop: 3,
    backgroundColor: '#4799eb',
    color: 'white',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '700',
  },
  badgePlatformView: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 15,
    padding: 2,
    justifyContent: 'flex-end',
    flexDirection: "row",
  },
  badgePlatform: {
    padding: 3,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  cardContent: {
    backgroundColor: "#4f545c",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#4f545c",
    color: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  itemBorder: {
    borderWidth: 0.5,
    borderColor: "#cccccc",
  },
  itemImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: 150,
  },
  cardText: {
    color: "white",
    padding: 10,
    width: "100%",
  },
  cardFooter: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 10,
  },
  cardFooterMenu: {
    flex: 1,
    backgroundColor: "#4f545c",
    textAlign: 'center',
    borderRightWidth: 0.6,
    paddingTop: 8,
    color: "white",
    paddingBottom: 8,
    fontWeight: "600",
    fontSize: 15,
    borderColor: "rgba(200, 200, 200,0.3)",
    borderTopWidth: 0.6,
  },
  note: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 15,
    padding: 2,
    fontWeight: "600",
    alignSelf: 'flex-start',
    backgroundColor: "rgba(66,133,244,0.7)",
  },
  itemTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  itemSubTitle: {
    marginTop: 5,
    color: "white",
    fontSize: 17,
  }
});
