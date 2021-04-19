// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions,StatusBar, 
		TouchableOpacity,Button, ScrollView} from 'react-native';
import Constants from "expo-constants";

import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


export default function Splash()  {	
		const { colors } = useTheme();
    const navigation = useNavigation();


		return(
			<View style={styles.container}>		      
		      <StatusBar backgroundColor="black" barStyle="light-content" />
		      <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/Logo1.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
            >
             <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with your home!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={()=>navigation.navigate('SignIn')} >               
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
            </TouchableOpacity>
           	
            </View>
        </Animatable.View>

	</View>
		);
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    paddingTop: Constants.statusBarHeight,
   
  },
   header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
   footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
   logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
   button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor: '#009387',
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});


