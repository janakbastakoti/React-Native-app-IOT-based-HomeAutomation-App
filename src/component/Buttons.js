import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Buttons = ({color,textColor,text, ...rest}) => {
	return (
		<TouchableOpacity style={[styles.button, {backgroundColor: color}]} {...rest}>
			<Text style={[styles.buttonText,{color: textColor}]}>TURN {text}</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
  button: {
    width: 103,
    height: 43,
    margin: 4,
    borderRadius: 20,
    alignItems: 'center' ,
    alignSelf:  'center' ,
    justifyContent: 'center',
  },
  buttonText:{
  	fontWeight: 'bold',
  	fontSize: 18,  	
  	
  },
});

export default Buttons