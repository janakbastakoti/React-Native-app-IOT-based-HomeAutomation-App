import React, { useState } from 'react';
import { View, Text,Button, TouchableOpacity, Dimensions, TextInput, Alert, ActivityIndicator,StatusBar,
    Platform, StyleSheet, ScrollView } from 'react-native';
import Constants from "expo-constants";
// import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

import {AuthContext} from '../component/context';


export default function SignUp() {
    const navigation = useNavigation();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState();
    const [isValidUser, setIsValidUser] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);    
    const [confirm_password, setConfirm_password] = useState(false);
    const [secureTextEntry1, setSecureTextEntry1]= React.useState(true);

    const { signUp } = React.useContext(AuthContext);
    const { colors } = useTheme();
    
    
    const textInputChange = (val) => {
        setIsValidUser(false)
        if( val.length >= 5 ) {
            setUsername(val)
            setIsValidUser(true)
        } else {
            setIsValidUser(false)
        }
    }

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

    const handleConfirmPasswordChange = (val) => {
        setConfirm_password(false)
        if(password == val){
          setConfirm_password(true)
        }
    }

    const handleSignUp = () =>{
        if(username != null && email  != null && password != null){

            signUp(username, email, password)
            // console.log('good')
            resetForm()
        }
        else{
            console.log('please enter username, email and password')
            Alert.alert('Error','please enter username, email and password')
        }
    }

    const resetForm = () =>{
        setUsername(null)
        setEmail(null)
        setPassword(null)
        setConfirm_password(false)
        setIsValidUser(false)
        setIsValidEmail(false)
    }


    


    return(
        <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now !</Text>
        </View>
        
        <Animatable.View style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
            >
            <ScrollView>
            <Text style={[styles.text_footer, {
                color: colors.text
                }]}>User Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user"
                    color="#000000"
                    size={25}
                />
                <TextInput 
                    placeholder="Your Name"
                    placeholderTextColor="#C7C2C2"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(val) => textInputChange(val)}
                    keyboardType = "email-address" 
                />
                {isValidUser ? 
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
                    secureTextEntry = {secureTextEntry1}
                    onEndEditing={(val)=> setPassword(val) }
                />
                 <TouchableOpacity
                    onPress={()=> setSecureTextEntry1(!secureTextEntry1) }
                >
                    {secureTextEntry1 ? 
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
                <Text style={[styles.text_footer, {
                color: colors.text
                }]}>Confirm Password</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={colors.text}
                    size={25}
                />
                <TextInput 
                    placeholder="Confirm Password"
                    placeholderTextColor="#C7C2C2"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    secureTextEntry = {true}
                    onEndEditing={(val)=>handleConfirmPasswordChange(val)}
                />
                 {confirm_password ? 
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

                <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                <Text style={{color: '#009387', marginTop:15}}>Already have an account?</Text>
                </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => handleSignUp()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
