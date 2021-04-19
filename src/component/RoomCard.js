import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RoomCard = ({url,title, ...rest}) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.btnView} {...rest} >
				<Image style={styles.image}
					source={{ uri: url }} />
				<Text style={styles.text}>{title}</Text>
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
	image: {
		width: (windowWidth / 2) - 10,
		margin: 5,
		height: 100,
		borderRadius: 5,
	},
	btnView:{
		width: (windowWidth / 2),
		flex: 1,
		// alignItems: 'center',
		
	},
	text: {
		color: '#000000',
		margin: 5,
		fontSize: 18,
		justifyContent: 'center' ,		
		alignSelf: 'center',
	},
});


export default RoomCard;
