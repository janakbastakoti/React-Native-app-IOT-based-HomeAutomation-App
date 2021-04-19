import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import {f, auth, database, storage } from '../../config/Config';
import { Appbar, FAB, Portal, Provider, Dialog, Paragraph, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

export default function Appliance() {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
		<View>
			<Appbar.Header style= {{backgroundColor: '#009387'}}>
			  	<Appbar.Action icon={()=>
			  		<Icon name="menu" color='#fff' size= {25} />}			        
			          onPress={() => navigation.openDrawer()}/>
				<Appbar.Content title="Home Automation" style= {styles.headerTitle} />				      
				<Appbar.Action icon="dots-vertical" onPress={()=>console.log('prieo')} />
			</Appbar.Header>
		</View>




		<TouchableOpacity onPress = {() =>console.log('pressed')} >				
			<Image style={styles.image}
				source={{uri: props.url}} />
			<Text style={styles.text}>{props.title}</Text>			
		</TouchableOpacity>
		</View>
	)
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageView: {

  },
  image:{
  	width: (windowWidth/2) - 10,
  	margin: 5,
  	height: 100
  },
  text: {
  	color: '#000000',
  	margin: 5,
  	fontSize: 18,


  },
});

