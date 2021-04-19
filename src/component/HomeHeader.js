import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';



export default function HomeHeader () {
		return (
			<View style={styles.container}>
				<View>
				<Header
				  statusBarProps={{ barStyle: 'light-content' }}
				  barStyle="light-content" // or directly				  
				  leftComponent={<MyCustomLeftComponent />}
				  rightComponent={<TouchableOpacity onPress={()=>console.log('pressed2')}>
				  					<MyCustomRightComponent /></TouchableOpacity>}
				  centerComponent={<MyCustomCenterComponent />}
				  containerStyle={{
				    backgroundColor: '#009387',
				    justifyContent: 'space-between',
				  }}
				/>
			</View>
			</View>
		);
	
}

const MyCustomLeftComponent = () =>{
	const navigation = useNavigation();
	return(
		<View>
			<TouchableOpacity onPress={()=> navigation.openDrawer()}>
			<Icon name="menu" size={25} color="#fff" style={{paddingTop:3}}/>
			</TouchableOpacity>
		</View>
		);
}

const MyCustomRightComponent = () =>{
	return(
		<View>		
			<Icon name="dots-three-vertical" size={20} color="#fff" style={{paddingTop:3}}/>
		</View>
		);
}
const MyCustomCenterComponent = () =>{
	return(
		<View>
			<Text style={{color:'#fff',fontSize:18}}>Home Automation</Text>
		</View>
		);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


<Provider>
      <Portal>
        <FAB.Group
          icon='plus'

          onPress={() => console.log('pressed plus')}
        />
      </Portal>
    </Provider>