import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerExample from "./camera.js"


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,ImageBackground,
  Button,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='App logo opening screen' component={openingScreen} />
        <Stack.Screen name='Welcome screen' component={welcomeScreen} />
        <Stack.Screen name='Username screen' component={usernameScreen} />
        <Stack.Screen name='Home screen' component={HomeScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
};

const openingScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ImageBackground source={require('./assets/img/cover2.jpg')}
                style={{flex: 1}} 
                imageStyle={{ opacity: 0.7,backgroundColor: 'dodgerblue'}}
                >
                <View style={{flex:10, justifyContent:'center'}}>
                    <View style={{bottom:200, alignItems:'center'}}>
                        <Image source={require('./assets/img/logo.png')} style={styles.logo}/>
                        <Text>CNOTE</Text> 
                        <Text>Play, compete & learn guitar</Text>
                    </View>
                </View>  
                <View style ={{backgroundColor:'orange', flex:1, justifyContent:'center'}}>
                    <Button title='Continue' onPress={()=>navigation.navigate('Welcome screen')}/>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
const welcomeScreen = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');
    return(
        <SafeAreaView style={styles.container1}>
            <View style={{height:300, backgroundColor:'white'}}>
                <Text style={{top:100}}> Welcome to CNote! An AI enabled guitar learning app where you can take your guitar playing skills 
                to next level all while engaging and competing with our online users. So, invite your friends and try battling
                it out at our ear training arena with your musical peers!
                </Text>
            </View>
            <View style={{height:300, backgroundColor:'white'}}>
                <Text>Please select your current level of guitar playing:</Text>
                
                <View style={{backgroundColor:'red'}}>
                    <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                    />
                    <RadioButton
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                    />
                </View>
            </View>
            <View style={{backgroundColor:'orange',height:40}}>
                <Button title='skip for later >' onPress={()=>navigation.navigate('Username screen')} />
            </View>    
        </SafeAreaView>
    );
};
const usernameScreen = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container1}>
            <View style={{flex:10, top:50}}>
                <Text> Choose your username that you would like other players to see 
                </Text>
                <TextInput />
            </View>
            <View style={{flex:1}}>
                <Button title='skip for later >' onPress={()=>navigation.navigate('Home screen')} style={{position: 'absolute', bottom:20}} />
            </View>
        </SafeAreaView>
    );
};
const HomeScreen = ({navigation}) => {
    return(
        <SafeAreaView styles={styles.container1}>
            <View style={{alignItems:'center'}}>
                <View style={{width:200,height:100, justifyContent:'center'}}>
                    <Button title='Register/Login' />
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{width:'50%', height: 250, backgroundColor:'red', justifyContent:'center', alignItems:'center'}}>
                    <Text>Sight Reading Battle</Text>
                </View>
                <View style={{width:'50%',height: 250, backgroundColor:'yellow', justifyContent:'center', alignItems:'center'}}>
                    <Text>Ear Training Battle</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{width:'50%',height: 250, backgroundColor:'green', justifyContent:'center', alignItems:'center'}}>
                    <Text>Practice music scores</Text>
                </View>
                <View style={{width:'50%',height: 250, backgroundColor:'dodgerblue', justifyContent:'center', alignItems:'center'}}>
                    <Button title='Upload image score' onClick={()=> ImagePickerExample}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

/*
<Button title='Upload image score' onPress={()=> ImagePickerExample()}/>
const function UploadImage() {
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
*/

/*
function OpenCamera () {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );   

}
*/

const styles = StyleSheet.create(
    {
    container1: {flex:1},
    logo:{
        height:100,
        width:100,
    },
    container3:{},
    container: {flex:1},
    camera : {  }
    }
);
export default App;