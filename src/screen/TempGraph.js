import React,{useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import {  LineChart } from "react-native-chart-kit";
import {f, auth, database, storage } from '../../config/Config';
import Constants from "expo-constants";

import { Appbar, FAB, Portal, Provider, Dialog, Paragraph, Modal } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const TempGraph = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [userid, setUserid] = React.useState()	
	const [dummyData, setDummyData] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const { userId, roomName, roomId } = route.params;


	console.log('userId::::',userId);

	const fetchData = async(userId, roomId) =>{	    
	    var loadRef = await database.ref('User').child(userId).child('Room').child(roomId).child('Temperature'); 
	    setLoading(true)
	    loadRef.orderByChild('temp_val').once('value').then(function(snapshot) {
	      const exists = (snapshot.val() !== null);
	      if(exists) {
	        var data = snapshot.val();
	      }else{ noData() }
	        var temperature_data = dummyData
	        for(var temperature in data){
	          addToFlatlist(temperature_data, data , temperature)
	        }     
	    }).catch(err=>console.log(err))         
	    
	 }

	const noData =() =>{
      setLoading(false)
    }

	 const addToFlatlist = (temperature_data, data , temperature) =>{
  		var temperatureObj = data[temperature];
  		// console.log('applianceObj.author',applianceObj.author)
  		console.log('temperatureObj',temperatureObj)                          
        setLoading(false)
        setDummyData(prevArray=> [...prevArray,{ 
            id: temperatureObj,
            temp: temperatureObj.temp_val,
            time: temperatureObj.time,
           }
        ])
  	}

	useEffect(() => {
	    fetchData(userId, roomId)
	    console.log('dummyData::::',dummyData)			
		}, [])
	return (
		<View style={styles.container}>
			<View>
			<Appbar.Header style= {{backgroundColor: '#009387'}}>
			  	<Appbar.Action icon={()=>
			  		<AntDesign name="arrowleft" color='#fff' size= {25} />}			        
			          onPress={() => navigation.goBack()}/>
				<Appbar.Content title="Temperature Graph" style= {styles.headerTitle} />				      
				<Appbar.Action icon="dots-vertical" onPress={()=>console.log('prieo')} />
			</Appbar.Header>			
		    </View>


		    {loading? (<ActivityIndicator size="large" color="#009387" />):
		    <View>
			  <Text style={styles.headText}>Temperature of {roomName} 7 March 2021</Text>
			  <LineChart
			    data={{
			      labels: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12"],
			      datasets: [ { data: [ 10, 10.5, 14, 15, 15.5, 16, 16 , 18, 18, 18.8 ,19, 19] }]
			      
			    }}
			    width={Dimensions.get("window").width} // from react-native
			    height={220}
			    // yAxisLabel="$"
			    yAxisSuffix=" °C"
			    yAxisInterval={1}
			    xAxisInterval={2} // optional, defaults to 1
			    chartConfig={chartConfig}
			    bezier
			    style={{
			      marginVertical: 8,
			      borderRadius: 16
			    }}
			  />
			</View>	
			}


		   
			
		    
		</View>
	)
}

const chartConfig = {
	  backgroundColor: "#009387",
	  backgroundGradientFrom: "#009387",
	  backgroundGradientTo: "#009387",
	  decimalPlaces: 2, // optional, defaults to 2dp
	  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	  style: {
	        borderRadius: 16
	        },
		      propsForDots: {
		        r: "6",
		        strokeWidth: "2",
		        stroke: "#ffa726"
		      }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
   headerTitle:{
  	alignItems: 'center',
    justifyContent: 'center',
  },
  headText:{
  	alignSelf: 'center' ,
  	fontSize: 18,
  	color: '#009387' 
  },
});


// const data = [
// 	{id:1,temp: 25  , day:1},
// 	{id:2,temp: 25.5, day:2},
// 	{id:3,temp: 27  , day:3},
// 	{id:4,temp: 26  , day:4},
// 	{id:5,temp: 30  , day:5},
// 	{id:6,temp: 30  , day:6},
// 	{id:7,temp: 32  , day:7},
// 	] datasets:[dummyData.temp ]

export default TempGraph




// <View>
// 			  <Text style={styles.headText}>Temperature of Kitchen 2020</Text>
// 			  <LineChart
// 			    data={{
// 			      labels: ["1", "2", "3", "4", "5", "6",'7','8','9','10'],
// 			      datasets: [
// 			        {
// 			          data: [
// 			           30.1, 32.45, 34, 25, 29, 28, 45, 30, 25
			            
// 			          ]
// 			        }
// 			      ]
// 			    }}
// 			    width={Dimensions.get("window").width} // from react-native
// 			    height={220}
// 			    // yAxisLabel="$"
// 			    yAxisSuffix=" °C"
// 			    yAxisInterval={1}
// 			    xAxisInterval={2} // optional, defaults to 1
// 			    chartConfig={chartConfig}
// 			    bezier
// 			    style={{
// 			      marginVertical: 8,
// 			      borderRadius: 16
// 			    }}
// 			  />
// 			</View>




// setLoading(true)	    
//       	await database.ref(`/User/${userId}/Room/${roomId}/`).orderByChild('Temp').once('value', snapshot => {
//         var data = snapshot.val()
//         console.log('data',data.Temperature.temp_value)
//         console.log('data',time.Temperature.time)
        
//         // setTempval(data.temp)
//         // console.log('User data: ', data);
//         setLoading(false)
//  30.1, 32.45, 34, 25, 29, 28, 30