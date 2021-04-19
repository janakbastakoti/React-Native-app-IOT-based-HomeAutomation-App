import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch  } from 'react-native-paper';
import {f, auth, database, storage } from '../../config/Config';
import Buttons from './Buttons';


const ApplianceCard = (props) => {
	const navigation = useNavigation();
	const [status, setStatus] = useState()
	const [userid, setUserid] = useState()
	const [roomid, setRoomid] = useState()
	const [applianceId, setApplianceId] = useState()
	const [ab, setAb] = useState()
	const [ab1, setAb1] = useState()

	const update = async(val) => {
		await database.ref('User').child(userid).child('Room').child(roomid).child('appliance').child(applianceId).child('status').set(val);
		
	}

	const initializeStatus = () =>{
		if(props.status == 1){
			setAb('ON')
			setAb1('OFF')
		}else{
			setAb('OFF')
			setAb1('ON')
		}
		setStatus(props.status)
		setUserid(props.userid)
		setRoomid(props.roomId)
		setApplianceId(props.id)

	}
	const handleToggle = () =>{
		if(status == 1){
			setAb('OFF')
			setAb1('ON')

		}else{
			setAb('ON')
			setAb1('OFF')
		}
	}

	useEffect(() => {
		initializeStatus()
	}, [])
	return (
		<View style={styles.container}>	
		<View style={styles.applianceView}>		
			<Image style={styles.image}
				source={{ uri: props.url }} />
			<Text style={styles.text}>{props.title}</Text>
			<Text style={styles.text1}>{ab}</Text>
			{status == 1? 
				<Buttons  color ='#ff0200' textColor="#000000"  text={ab1} onPress={()=>	{
					setStatus(0)
				 	handleToggle()
				 	update(0)
				}}/>
			  : 
			   <Buttons  color ='#009387' textColor="#fff"  text={ab1} onPress={()=>	{
					setStatus(1)
				 	handleToggle()
				 	update(1)
				}}/>
			}
        </View>		
		</View>
	)
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {		
		flex: 1,
		backgroundColor: '#fff',
		margin:3,

	},
	applianceView:{
		width: (windowWidth / 2),
		flex: 1,
	},
	image: {
		width: (windowWidth / 2) - 10,
		margin: 5,
		height: 100,
		borderRadius: 3,
	},
	btnView:{
		width: (windowWidth / 2),
		flex: 1,
		
	},
	text: {
		color: '#000000',
		margin: 5,
		fontSize: 18,
		// justifyContent: 'center' ,
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	text1: {
		color: '#000000',
		margin: 5,
		fontSize: 14,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	switch: {
    	alignSelf: 'center' , 
  },
});


export default ApplianceCard;
