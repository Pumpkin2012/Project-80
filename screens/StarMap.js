import React, { Component } from 'react';
import { Platform, SafeAreaView, StatusBar, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview'

export default class StarMapScreen extends Component {
    constructor(){
        super();
        this.state={
            longitude:{},
            latitude:{}
        };
        }
    render() {
    const {longitude,latitude} = this.state;
    const path = 'https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false'
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <SafeAreaView style={{marginTop: Platform.OS=="android"?StatusBar.currentHeight:0}}/>
                <View>
                <TextInput
                style={{height:40,borderColor:'gray',borderWidth:1}}
                placeholder="Enter your latitude"
                placeholderTextColor="#ffff#000000"
                onChangeText={(text)=>{
                    this.setState({
                        latitude:text
                    })
                }}
                
                />
                <TextInput
                style={{height:40,borderColor:'gray',borderWidth:1}}
                placeholder="Enter your longitude"
                placeholderTextColor="#ffff#000000"
                onChangeText={(text)=>{
                    this.setState({
                        longitude:text
                    })
                }}
                />
                </View>
                <WebView
                scalesPageToFit={true}
                source={{uri:path}}
                style={{marginTop:20,marginBottom:20}}
                />
            </View>
        )
    }
}