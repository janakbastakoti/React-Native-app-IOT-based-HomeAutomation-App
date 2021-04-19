// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, Platform, ActivityIndicator,StatusBar,  
		TouchableOpacity,Button, ScrollView, Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Constants from "expo-constants";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// import {f, auth, database, storage } from '../../config/config';
import { useNavigation } from '@react-navigation/native';
import {loginReducer, initialState } from '../../reducer/reducer';

import {AuthContext} from '../component/context';

export default function SignIn() {
    const navigation = useNavigation();
    const [loginState, dispatch] = React.useReducer(loginReducer, initialState)    
    const [email, setEmail] = React.useState(null)    
    const [password, setPassword] = React.useState()
    const [isLoading, setIsLoading]= React.useState(false)
    const [isValidEmail, setIsValidEmail] = React.useState(false)
    const [secureTextEntry, setSecureTextEntry]= React.useState(true);

 

    const { signIn } = React.useContext(AuthContext);
	const { colors } = useTheme();

    const handleEmailChange = (val) => {
        setIsValidEmail(false) 
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if( reg.test(val) === true ) {
            setEmail(val)
            setIsValidEmail(true) 
        } else {
            setIsValidEmail(false)
        }
    }

    const handleSignIn = (email, password) =>{
        setIsLoading(true)
        if(email  != null && password != null){    
            console.log(password) 
            console.log('email',email)  
            try{
                setIsLoading(false)
                signIn(email, password)
            }catch(err){ Alert.alert('Error',err)}  
           
        }else {
            setIsLoading(false)
            Alert.alert('Error','please enter both email and password'); 
        }       
    }

	return(
		<View style={styles.container}>
    	<StatusBar backgroundColor="black" barStyle="light-content" />
    	<View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
            >
            <Text style={[styles.text_footer, {
                color: colors.text
           		}]}>Email</Text>
            <View style={styles.action}>
                <MaterialCommunityIcons 
                    name="email"
                    color={colors.text}
                    size={25}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#C7C2C2"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleEmailChange(val)}
                    onEndEditing={(val) => handleEmailChange(val)}
                    keyboardType = "email-address" 
                />
                 {isValidEmail ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}

                </View>
            <Text style={[styles.text_footer, {
                color: colors.text
            	}]}>Password</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={colors.text}
                    size={25}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#C7C2C2"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => setPassword(val)}
                    secureTextEntry = {secureTextEntry}
                    onEndEditing={(val)=>setPassword(val) }
                    keyboardType = "email-address" 
                />
                <TouchableOpacity
                    onPress={()=> setSecureTextEntry(!secureTextEntry) }
                >
                    {secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={{color: '#009387', marginTop:15}}>Don't have an account?</Text>
            	</TouchableOpacity>
            <View style={styles.button}>
                {isLoading? 
                    <TouchableOpacity
                    onPress={() => handleSignIn(email, password) }
                    style={[styles.signIn, {
                        backgroundColor: '#009387',
                        marginTop: 15
                    }]}
                    >
                    <ActivityIndicator size="small" color="#00ff00" />
                    
                    </TouchableOpacity>
                 :
                    <TouchableOpacity
                    onPress={() => handleSignIn(email, password) }
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>


                }
                
            </View>

        </Animatable.View>
    </View>

		);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    paddingTop: Constants.statusBarHeight,
   
  },
  container2: {
    flex: 1,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
  },
   header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginLeft: 10,
        paddingLeft: 10,
        color: '#05375a',
        height: 45,
        borderRadius: 3,
        fontSize: 18,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
