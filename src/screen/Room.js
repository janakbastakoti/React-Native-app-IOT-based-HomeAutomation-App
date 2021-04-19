import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity,  Platform, 
	ActivityIndicator, Dimensions, ScrollView, Image } from 'react-native';
import Constants from "expo-constants";
import { Appbar, FAB, Portal, Provider, Dialog, Paragraph, Button, Modal, Switch  } from 'react-native-paper';
import {f, auth, database, storage } from '../../config/Config';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import ApplianceCard from '../component/ApplianceCard';
import {AuthContext} from '../component/context';

import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

import { useTheme } from '@react-navigation/native';

export default function Room() {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const { signOut } = React.useContext(AuthContext);
  const { name, roomId } = route.params;

  const [day, setDay] = React.useState();
  const [month , setMonth ] = React.useState();
  const [hours , setHours ] = React.useState();
  const [minute , setMinute ] = React.useState();
  const [second , setSecond ] = React.useState();
  const [tempval , setTempval ] = React.useState();



	const [userid, setUserid] = React.useState()
	const [dummyData, setDummyData] = React.useState([])
	const [loading, setLoading] = useState(false)
	const [roomid, setRoomid] = useState()

  const [isEmpty, setIsEmpty] = React.useState(null) 
  const [imageid, setImageid] = useState()
  const [image, setImage] = React.useState(false)
  const [currentFileType, setCurrentFileType] = useState()
 	const [visible, setVisible] = useState(false);
 	const [appliance, setAppliance] = React.useState(null);
  const [roomName, setRoomName] = React.useState(null);
  const [imageSelected, setImageSelected] = useState(false)
  const [imageUri, setImageUri] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)


  const [ab, setAb] = useState(false)
  const [once, setOnce] = useState(true)

  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	
	const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const s4 = () =>{
    return Math.floor((1+ Math.random()) * 0x10000 )
    .toString(16)
    .substring(1)
  }

  const uniqueId = () =>{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-'+ s4() + '-'+ s4() + '-'+ s4() + '-'+ s4()
  }


  const imagePicker = async () => {
    console.log("pressed")
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      // setImage(pickerResult)
      if(!pickerResult.cancelled){
        // console.log('data',pickerResult.uri);
        try{
          console.log('try block')
          setImageUri(pickerResult)
          setImage(true)
          // setImageSelected(true)
          setImageid(uniqueId())        
          // uploadImage(imageUri.uri)
        }catch(err){
          console.log('err',err)
        }       
      }else{
        console.log('cancelled')
        setImageSelected(false)
      }
      // console.log(pickerResult);
    }

    const uploadImage = async(uri) =>{
      var userId = f.auth().currentUser.uid;
      var imageId = imageid
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(uri)[1];
      console.log('ext', ext)
      setCurrentFileType(ext)
      setUploading(true)
      const response = await fetch(uri);
      const blob = await response.blob();
      var FilePath = imageId+'.'+ext
      var uploadTask = storage.ref('user/'+userId+'/'+roomid+'/img').child(FilePath).put(blob);

      uploadTask.on('state_changed', function(snapshot){
        var progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
        console.log('uploading',progress)
        setProgress(progress)
      }, function(error){
        console.log('error in upload',error)
      },function(){
        setProgress(100)
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
          console.log('downloadURL',downloadURL)
          processCreate(downloadURL)                
        })
      })
    }

    const processCreate = (imageUrl) =>{
      // data needed
      var userId = f.auth().currentUser.uid;
      var name = appliance 
      var imageId  = imageid      
      // photo object 
      var applianceObj = {
        author: userId,
        name: name, 
        url:  imageUrl,
        status: isSwitchOn 
      }
      console.log(applianceObj)
      // add to main database
      database.ref('/User/'+userId+'/Room/'+roomid+'/appliance/'+imageId).set(applianceObj)
      console.log('Image Uploaded')
      setImageSelected(false)
      setUploading(false)      
      setImage(false)
      setImageUri(null)
      setDummyData([])
      hideModal()      
      fetchData(userid, roomId)
    }

	const loadData = () =>{      
  		f.auth().onAuthStateChanged(function(user){
        if(user){
		      var userid = f.auth().currentUser.uid;
          console.log('name', name)
          console.log('roomId', roomId)
		      setRoomid(roomId)
          setUserid(userid)
          fetchData(userid, roomId)
        }else{
          signOut()
          
        }
      })
  	}

  	const addToFlatlist = (appliance_data, data , appliance) =>{
  		var applianceObj = data[appliance];
  		// console.log('applianceObj.author',applianceObj.author)                          
            setLoading(false)
            setDummyData(prevArray=> [...prevArray,{
                  id: appliance,
                  url:applianceObj.url,
                  name: applianceObj.name,
                  status: applianceObj.status
                }
            ])

  	}

  	const fetchData = async(userId, roomId) =>{
      setDummyData([])	    
	    var loadRef = await database.ref('User').child(userId).child('Room').child(roomId).child('appliance');
      await database.ref(`/User/${userId}/Room/${roomId}/`).orderByChild('Temp').once('value', snapshot => {
        var data = snapshot.val()
        console.log('data',data)
        setTempval(data.temp)
        console.log('User data: ', data.temp);
      });      
	    setLoading(true)
	    loadRef.orderByChild('name').once('value').then(function(snapshot) {
	      const exists = (snapshot.val() !== null);
	      if(exists) {
	        var data = snapshot.val();
	      }else{ noData() }
	        var appliance_data = dummyData
	        for(var appliance in data){
	          addToFlatlist(appliance_data, data , appliance)
	        }     
	    }).catch(err=>console.log(err))




	 }

	const noData =() =>{
      setLoading(false)
      setIsEmpty(true)
   }

  const handleCreateAppliance = () =>{
    uploadImage(imageUri.uri)
   }

	useEffect(() => {
    setDummyData(null)
    setTimeout(async() => {
     loadData(); 
     setDay(new Date().getDate());
     if (new Date().getMonth() + 1 == 3){
      setMonth("March")
     }
     setHours(new Date().getHours());
     setMinute(new Date().getMinutes())
     setSecond(new Date().getSeconds())


    }, 1000);
		
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="black" barStyle="dark-content" />
			<View>
				<Appbar.Header style= {{backgroundColor: '#009387'}}>
					<Appbar.Action icon={()=>
					  	<Icon name="arrowleft" color='#fff' size= {25} />}			        
			                onPress={() => navigation.goBack()}
						/>
				      <Appbar.Content title={name} style= {styles.headerTitle} />				      
				      <Appbar.Action icon="dots-vertical" onPress={()=>console.log('prieo')} />
				</Appbar.Header>
			</View>
			
			{loading? (<ActivityIndicator size="large" color="#009387" />):
	          <ScrollView>  
              { isEmpty? (null):(
                <View style={styles.indicatorView}>
                    <Text style={styles.textIndicator}>{day} {month} {hours}:{minute}:{second}</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('TempGraph',{ roomName:name , userId:userid, roomId: roomid })}>
                    <Text style={styles.textIndicator}>Room Temperature : {tempval}°C</Text>
                    </TouchableOpacity>
                  </View>
                  ) }         
	            { isEmpty? (<Text>Empty Room</Text>):
                (<ScrollView>                  
	                 <FlatList
      				        data={dummyData}
      				        numColumns= {2}
      				        renderItem={({item})=>{                        
      				        	return(
      				        		<ApplianceCard roomId={roomid}  id={item.id} url={item.url} title={item.name}
                                status={item.status} userid={userid}  />
      				        	)				        		
      				        }}
      				        keyExtractor={item => item.id}
                      
			      	      />
                   </ScrollView>)
	            }
	          </ScrollView> 
			}



			<Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} >
            <View style={styles.modal}>
              <Text style={{fontSize:18, marginBottom: 20}}>Create Appliance</Text>
                <TextInput 
                      placeholder="Appliance Name"
                      placeholderTextColor="#C7C2C2"
                      style={styles.textInput1}
                      autoCapitalize="none"
                      onChangeText={(val) => setAppliance(val)}
                      onEndEditing={(val) => setAppliance(val)}
                      keyboardType = "email-address" 
                      /> 
                             
                        <TouchableOpacity
                            onPress={() => imagePicker()}
                            style={[styles.imagePick, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Choose Image</Text>
                        </TouchableOpacity>
                        <View style={styles.switchView}>
                          <Text style={{fontSize:18, marginRight: 30}}>Status(on/off) ::</Text>
                          <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  />
                        </View>
                       
                        {image ? (
                          <Image source={{ uri: imageUri.uri }} style={styles.logo} />
                          ): null
                        }

                    <View style={styles.buttonAction}>
                        <TouchableOpacity style={styles.button}  onPress={()=> hideModal()} >
                          <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=> handleCreateAppliance()} >
                           <Text style={styles.text}>Create</Text>
                        </TouchableOpacity>
                    </View>
            </View>
                   
            </Modal>
          </Portal>
       </Provider>




			<FAB
			    style={styles.fab}
			    large
			    color="#F5FCFF"
			    icon="plus"
			    onPress={() => showModal()}
			  />




		</View>
	)
}
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Constants.statusBarHeight,
  },
   headerTitle:{
  	alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorView:{
    backgroundColor: '#009387',
    height: 120,
    borderRadius: 6,
    marginTop: 5,
    alignItems: 'center',


  },
  textIndicator:{
    color: '#fff',
    fontSize: 18,
    margin:5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#009387'
  },
  applianceView:{
    flex: 1,
    backgroundColor: '#fff',
    width: windowWidth/2,

  },
  image: {
		width: (windowWidth / 2) - 10,
		margin: 5,
		height: 100,
    borderRadius: 3,
	},
  text1: {
		color: 'black',
		margin: 5,
		fontSize: 18,
    alignSelf:  'center',
  },
  switch: {
    alignSelf: 'center' , 
  },
  textInput1:{
      height:50,
      fontSize:18, 
      borderRadius:3, 
      width:'70%',
      // borderColor:'green', 
      // borderWidth:4, 
      color: '#05375a',
    },
    buttonAction:{
      marginTop: 10,
      margin: 4,
    	flexDirection: 'row' ,
    	justifyContent:  'space-around' ,
      
    },
    switchView:{
      justifyContent: 'space-around', 
      marginTop: 20,
      flexDirection: 'row',
    },

    button1: {
    	backgroundColor: '#fff',
    	width: 300,
    },
    button:{
    	backgroundColor: '#009387',
    	width:100,
      height: 35,
    	color: '#000000',
      margin: 10,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal:{
      margin: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button3: {
        alignItems: 'center',
        marginTop: 20
    },
    text:{
      fontSize: 15,
      color:'#fff'
    },
    imagePick: {
        width: '70%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    logo:{
      width: 200,
      height: 90,
      margin: 5,
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold'
    },



 });

