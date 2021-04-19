import React, {useEffect, useState, useMemo} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';

import Splash from '../src/screen/Splash';
import SignIn from '../src/screen/SignIn';
import SignUp from '../src/screen/SignUp';
import Home from '../src/screen/Home';
import Room from '../src/screen/Room';
import TempGraph from '../src/screen/TempGraph';
//import LottieView from 'lottie-react-native';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../src/component/DrawerContent';


import {f, auth, database, storage } from '../config/Config';

import AsyncStorage from '@react-native-community/async-storage';

import {loginReducer, initialState } from '../reducer/reducer';
import {AuthContext} from '../src/component/context';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootStack = () =>{
	return(
		<Stack.Navigator headerMode="none">
		<Stack.Screen name="Splash" component={Splash} />
		<Stack.Screen name="SignIn" component={SignIn} />
		<Stack.Screen name="SignUp" component={SignUp} />	 
		</Stack.Navigator>
	);
}


const AppStack = () =>{
	return(
		<Drawer.Navigator initialRouteName="Home" drawerContent={ ()=> <DrawerContent />} >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Room" component={Room} />
        <Drawer.Screen name="TempGraph" component={TempGraph} />
      	</Drawer.Navigator>
	);
}


export default function Auth() {
	const [loginState, dispatch] = React.useReducer(loginReducer, initialState)

	const authContext = useMemo(() =>({
		signIn: async (email, password) =>{
			let userToken;
			// email = null;
			if(email != '' && password != ''){
				try{					
		          	let user = await auth.signInWithEmailAndPassword(email,password)		          	
		         	userToken = user;		                      
		        }catch(err){console.log(err)}
				try {
					let jsonValue = JSON.stringify(userToken)
		        	await AsyncStorage.setItem('userToken', jsonValue);
			    }catch(e) {
			        console.log(e);
			    }
			}
			dispatch({type: 'LOGIN', id: email, token: userToken});
		},

		signOut: async () =>{
			try{
		        	await AsyncStorage.removeItem('userToken');
			    }catch(e) {
			        console.log(e);
			    }
			dispatch({type: 'LOGOUT'});
		},

		signUp: async (username,email, password) =>{
			let userToken;
			userToken = null;
			try{
	          	await auth.createUserWithEmailAndPassword(email,password)
	          	.then((userObj) => {	          		
			        userToken = userObj.user.uid
			        var uObj = {
			            username: username,
			            email: email,
			            Room: {},
			            avatar: 'https://images.unsplash.com/photo-1598819672343-59f4fdde9cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
			        }
			        try{
			            database.ref('User').child(userObj.user.uid).set(uObj);          
			        }catch(err){console.log('error database write',err)}

	          }) 
	        }catch(err){console.log(err)}

			dispatch({type: 'REGISTER', id: email, token: userToken});
		},
	}), [])


	useEffect(() => {
		setTimeout(async() => {
			let userToken;
		      userToken = null;
		      try {
		        userToken = await AsyncStorage.getItem('userToken');
		      } catch(e) {
		        console.log(e);
		      }      		
      		dispatch({ type: 'RETRIVE_TOKEN', token: userToken });
		}, 1000);
	}, [])





	if (loginState.isLoading) {
    return (
        <View style={styles.container2}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
    }
	return(
			<AuthContext.Provider value={authContext}>
			<NavigationContainer>
			{loginState.userToken ? (
				<AppStack />				
				) : (
				<RootStack />   
				)}
			</NavigationContainer>		
			</AuthContext.Provider>		
	);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




