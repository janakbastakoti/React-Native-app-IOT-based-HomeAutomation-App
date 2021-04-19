import React, { useEffect, useState } from 'react'
import { Text, Platform, View , SafeAreaView, StyleSheet, Dimensions, TextInput, StatusBar, Image,Button, 
  FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
import {f, auth, database, storage } from '../../config/Config';
import { Appbar, FAB, Portal, Provider, Dialog, Paragraph, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';
import RoomCard from '../component/RoomCard';

import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

import {AuthContext} from '../component/context';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
	const { colors } = useTheme();
	const { signOut } = React.useContext(AuthContext);
	const navigation = useNavigation();

	const [userid, setUserid] = React.useState()	
	const [dummyData, setDummyData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [isEmpty, setIsEmpty] = React.useState(false) 
  const [imageid, setImageid] = useState()
  const [image, setImage] = React.useState(false)
  const [currentFileType, setCurrentFileType] = useState()
  const [visible, setVisible] = useState(false);
  const [roomName, setRoomName] = React.useState(null);
  const [imageSelected, setImageSelected] = useState(false)
  const [imageUri, setImageUri] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

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

  const handleCreateRoom = () =>{
    uploadImage(imageUri.uri)
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
    var uploadTask = storage.ref('user/'+userId+'/img').child(FilePath).put(blob);

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
      var name = roomName 
      var imageId  = imageid
      
      // photo object 
      var roomObj = {
        author: userId,
        name: name, 
        url:  imageUrl 
      }
      console.log(roomObj)
      // add to main database
      database.ref('/User/'+userId+'/Room/'+imageId).set(roomObj)     
      // alert('Image uploaded')
      console.log('Image Uploaded')
      setImageSelected(false)
      setUploading(false)      
      // setCaption(null)
      setImage(false)
      setImageUri(null)
      hideModal()
      setDummyData([])
      fetchData(userid)
    }

  	const addToFlatlist = (room_data, data , Room) =>{
  		var roomObj = data[Room];
  		console.log('roomObj.author',roomObj.author)
          database.ref('User').child(roomObj.author).child('name').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if(exists) {
              var data = snapshot.val();
            }  
          database.ref('User').child(roomObj.author).child('url').once('value').then(function(snapshot) {
              const exists = (snapshot.val() !== null);
                if(exists) { var data1 = snapshot.val();}                           
              setLoading(false)
              setDummyData(prev=> [...prev,{
                  id: Room,
                  url:roomObj.url,
                  name: roomObj.name
                }
              ])

            }).catch(err=>console.log(err))
          }).catch(err=>console.log(err))

  	}

  	const fetchData = async(userId) =>{	
      setDummyData([])    
	    var loadRef = await database.ref('User').child(userId).child('Room');    
	    setLoading(true)
	    loadRef.orderByChild('name').once('value').then(function(snapshot) {
	      const exists = (snapshot.val() !== null);
	      if(exists) {
          setIsEmpty(false)
	        var data = snapshot.val();
	      }else{ noData() }
	        var room_data = dummyData
	        for(var Room in data){
	          addToFlatlist(room_data, data , Room)
	        }     
	    }).catch(err=>console.log(err))     
	 }

   const noData =() =>{
      setLoading(false)
      setIsEmpty(true)
   }

  	const loadData = () =>{
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
    
  	useEffect(() => {
      loadData()      
            
  	},[])
    



		return (
			<View  style={styles.container}>
				<StatusBar backgroundColor="black" barStyle="light-content" />
				<View>
					<Appbar.Header style= {{backgroundColor: '#009387'}}>
					  <Appbar.Action icon={()=>
					  	<Icon name="menu" color='#fff' size= {25} />}			        
			                onPress={() => navigation.openDrawer()}
						/>
				      <Appbar.Content title="Home Automation" style= {styles.headerTitle} />				      
				      <Appbar.Action icon="dots-vertical" onPress={()=>console.log('prieo')} />
				    </Appbar.Header>
				</View>
				{loading? (<ActivityIndicator size="large" color="#009387" />):
          <View>
            { isEmpty? (<Text>Empty Room</Text>):
                 (<FlatList
                data={dummyData}
                numColumns= {2}
                renderItem={({item})=>{
                  return(<RoomCard title={item.name} url= {item.url} roomId= {item.id} 
                  onPress={() => navigation.navigate('Room', { name: item.name, roomId: item.id })} 
                  />)                    
                }}
                keyExtractor={item => item.id}
              />)
            }
          </View> 
				}
       
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} >
            <View style={styles.modal}>
              <Text style={{fontSize:18, marginBottom: 20}}>Create Room</Text>

                <TextInput 
                    placeholder="Room Name"
                    placeholderTextColor="#C7C2C2"
                    style={styles.textInput1}
                    autoCapitalize="none"
                    onChangeText={(val) => setRoomName(val)}
                    onEndEditing={(val) => setRoomName(val)}
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
                        
                        {image ? (
                          <Image source={{ uri: imageUri.uri }} style={styles.logo} />
                          ): null
                        }

                    <View style={styles.buttonAction}>
                        <TouchableOpacity style={styles.button}  onPress={()=> hideModal()} >
                          <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=> handleCreateRoom()} >
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
		);
	
}

const {height} = Dimensions.get("screen");
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
   fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#009387'
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
    	justifyContent:  'space-around' 
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
    	// height: 300,
    	// width: 300,
    	margin: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
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




