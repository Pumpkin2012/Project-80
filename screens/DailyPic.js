import React, { Component } from 'react';
import { ImageBackground, Linking, Text, View } from 'react-native';
import axios from 'axios'
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DailyPicScreen extends Component {
    constructor() {
        super()
        this.state = {
            apod: {}
        }
    }
    componentDidMount() {
        this.getAPOD()
    }
    getAPOD = () => {
        axios.get('https://apod.nasa.gov/apod?api_key=1yFFVV9bDaGBwIhXdjsew7sLMdYO17Rq1Jpy7COB')
            .then(response => {
                this.setState({
                    apod: response.data
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }
    renderImage = (url) => {
        <Image source={{ "uri": url }} style={{ width: '100%', height: 300, borderRadius: 20, margin: 3 }}></Image>
    }
    renderVideo = () => {
        <TouchableOpacity style={styles.listContainer} onPress={() => Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))} >
             <View style={styles.iconContainer}> 
              <Image source={require("../assets/play-video.png")} style={{ width: 50, height: 50 }}>
                </Image>
            </View>
         </TouchableOpacity>
    }
    render() {
        const url = this.state.apod.url 
        if (Object.keys(this.state.apod).length === 0) { 
            return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Text>Loading</Text>
             </View> )}
             else { 
                return (<View style={styles.container}>
                     <SafeAreaView style={styles.droidSafeArea} />
                      <ImageBackground source={require('../assets/stars.gif')} style={styles.backgroundImage}>
                         <View style={{ flex: 0.15, justifyContent: "center", textAlign: "center" }}>
                             <Text style={styles.routeText}>Daily Pic</Text>
                              </View>
                               <ScrollView style={styles.listContainer}>
                                 <TouchableOpacity onPress={() => Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))} >
                                     <Image source={{ "uri": url }} style={{ width: "100%", height: 300, borderRadius: 10 }}>
                                        </Image>
                                         </TouchableOpacity >
                                          <View style={{ padding: 20 }}>
                                            <Text style={styles.titleText}>{this.state.apod.title}</Text>
                                             <Text style={styles.explanationText}>{this.state.apod.explanation}</Text>
                                              </View> </ScrollView> </ImageBackground> </View>)}}

    }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    explanationText: {
        fontSize: 15,
         fontWeight: "bold",
          color: "white",
         marginTop: 10
    },
    iconContainer: {
        justifyContent: "center",
         alignItems: "center",
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
         flex: 0.8,
          marginLeft: 10,
           marginRight: 10,
            marginTop: 5,
             borderRadius: 10,
              backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})