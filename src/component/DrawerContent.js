import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import { Drawer, useTheme, Divider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {f, auth, database, storage } from '../../config/Config';

import {AuthContext} from '../component/context';


const DrawerContent = () => {
	const { signOut } = React.useContext(AuthContext);
  const [userid, setUserid] = React.useState()
  const [username, setUsername] = React.useState();
  const [avatar, setAvatar] = React.useState();

  const login = () =>{
      f.auth().onAuthStateChanged(function(user){
        if(user){
          var userid = f.auth().currentUser.uid;
          setUserid(userid)
          fetchData(userid)
        }else{
          signOut()
          
        }
      })
    }

    const fetchData = async(autherId) =>{
    await database.ref('User').child(autherId).child('username').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
        if(exists) { var data = snapshot.val();}
        setUsername(data)
      }).catch(err=>console.log(err))
    await database.ref('User').child(autherId).child('avatar').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
        if(exists) { var data1 = snapshot.val();}
        setAvatar(data1)
      }).catch(err=>console.log(err))
    }

    useEffect(() => {
      login()
      
    }, [])



	return (
		<View style={styles.container}>
  		<DrawerContentScrollView>
  		<View style={styles.cover}>
  		</View>
  		<View style={styles.profileView}>
  			<Image source ={{uri: avatar}}  style={styles.profile}/>
  		</View>
  		<View style={styles.profileTextView}>
  			<Text style={styles.profileText}>{username}</Text>
  		</View>
  		<View> 
  		 <Drawer.Section style={styles.drawerSection}>
  		 	  <DrawerItem 
                  icon={() => (
                  <Entypo 
                  name="home" 
                  color='#000000'
                  size= {25}
                  />
                  )}
                  label="Home"
                  onPress={() => console.log('pressed')}
                  />
          <DrawerItem 
                  icon={() => (
                  <AntDesign 
                  name="setting" 
                  color='#000000'
                  size={25}
                  />
                  )}
                  label="Setting"
                  onPress={() => console.log('pressed')}
                  />
                  <Divider />
          </Drawer.Section>

  		</View>
  		</DrawerContentScrollView>
  		<Drawer.Section style={styles.bottomDrawerSection}>
                  <DrawerItem 
                      icon={({color, size}) => (
                          <MaterialCommunityIcons 
                          name="exit-to-app" 
                          color={color}
                          size={size}
                          />
                      )}
                      label="Sign Out"
                      onPress={() => signOut()}
                  />
      </Drawer.Section>
		</View>
	)
}

export default DrawerContent; 

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cover: {
  	height: 150,
  	margin: 2,
  	backgroundColor: '#009387',
  	alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
  	alignItems: 'center',
    justifyContent: 'center',
},
  profile: {
  	width: 150,
  	height: 150,
  	borderRadius: 75,
  	marginTop: -70,  	
  },
  profileTextView:{
  	alignItems: 'center',
    justifyContent: 'center',
   },
   profileText:{
   	color: '#009387',
   	fontSize: 20,
	},
	drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
	screenText: {
		marginTop: 2,
		fontSize: 20,
		marginLeft: 30,
	},


});