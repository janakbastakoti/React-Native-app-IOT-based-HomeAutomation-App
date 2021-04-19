// import React, {useState, useEffect} from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { Appbar, FAB, Portal, Provider, Dialog, Paragraph, Button, Modal } from 'react-native-paper';
// import {f, auth, database, storage } from '../../config/Config';
// import { useTheme } from '@react-navigation/native';

// const Add = (props) => {
//   const { colors } = useTheme();
//   const [userid, setUserid] = React.useState()
//   const [roomName, setRoomName] = React.useState(null);
//   const [imageSelected, setImageSelected] = useState(false)
//   const [imageUri, setImageUri] = useState()
//   const [uploading, setUploading] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const [visible, setVisible] = useState(false);
//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);

//   const s4 = () =>{
//     return Math.floor((1+ Math.random()) * 0x10000 )
//     .toString(16)
//     .substring(1)
//   }

//   const uniqueId = () =>{
//     return s4() + s4() + '-' + s4() + '-' + s4() + '-'+ s4() + '-'+ s4() + '-'+ s4() + '-'+ s4()
//   }

//   const handleCreateRoom = () =>{
//       if(roomName != null &&  image != null){
//         var name = roomName;
//         var picture     = image;
//         setImage(null);
//         setRoomName(null);
//         var roomId = uniqueId()
        
//         var roomObj = {
//           author: userid,
//           name : name,
//           url: image
//          }
//     setVisible(false)
//       }else{
//         console.log('error')
//       }
      
//     }






//   const imagePicker = async () => {
//     console.log("pressed")
//       let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

//       if (permissionResult.granted === false) {
//         alert("Permission to access camera roll is required!");
//         return;
//       }

//       let pickerResult = await ImagePicker.launchImageLibraryAsync();
//       setImage(pickerResult)
//       if(!pickerResult.cancelled){
//         console.log('data',pickerResult.uri);
//         try{
//           console.log('try block')
//           setImageUri(pickerResult.uri)
//           setImageSelected(true)
//           setImageid(uniqueId())        
//           // uploadImage(pickerResult.uri)
//         }catch(err){
//           console.log('err',err)
//         }       
//       }else{
//         console.log('cancelled')
//         setImageSelected(false)
//       }
//       // console.log(pickerResult);
//     }

//     const modal = () =>{
//      const { visibleM } = props 
//       setVisible(visibleM)
//     }

// useEffect(() => {
//     modal()           
//   },[])


//   return (
//     <Provider>
//         <Portal>
//           <Modal visible={visible} onDismiss={hideModal} style={styles.modal} >
//             <TextInput 
//                       placeholder="Room Name"
//                        placeholderTextColor="#C7C2C2"
//                       style={[styles.textInput, {
//                              color: colors.text
//                           }]}
//                           autoCapitalize="none"
//                           onChangeText={(val) => setRoomName(val)}
//                           onEndEditing={(val) => setRoomName(val)}
//                           keyboardType = "email-address" 
//                       />                     
//                         <TouchableOpacity
//                             onPress={() => imagePicker()}
//                             style={[styles.imagePick, {
//                                 borderColor: '#009387',
//                                 borderWidth: 1,
//                                 marginTop: 15
//                             }]}
//                         >
//                             <Text style={[styles.textSign, {
//                                 color: '#009387'
//                             }]}>Upload Image</Text>
//                         </TouchableOpacity>

//                         <View style={styles.buttonAction}>
//                         <Button style={styles.button} color='#fff' onPress={()=> hideDialog()} >Cancel</Button>
//                         <Button style={styles.button} color='#fff' onPress={()=> console.log('presed')} >Done</Button>
//                     </View>
                   
//             </Modal>
//         </Portal>
//     </Provider>
//   )
// }

// const styles = StyleSheet.create({
//   textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         marginLeft: 10,
//         paddingLeft: 10,
//         color: '#05375a',
//         height: 65,
//         borderRadius: 3,
//         fontSize: 18,
//         flexDirection: 'row' 
//     },
//     buttonAction:{
//       flexDirection: 'row' ,
//       justifyContent:  'space-around' 
//     },
//     button1: {
//       backgroundColor: '#fff',
//       width: 300,
//     },
//     button:{
//       backgroundColor: '#009387',
//       width:100,
//       color: '#000000',
//     },
//     modal:{
//       height: 300,
//       width: 300,
//       margin: 10,
//     },



//     button3: {
//         alignItems: 'center',
//         marginTop: 20
//     },
//     imagePick: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },

// });

// export default Add;



//  <Provider>
//         <Portal>
//           <Modal visible={visible} onDismiss={hideModal} >
//             <View style={styles.modal}>
//               <Text style={{fontSize:18, marginBottom: 20}}>Create Room</Text>
//                 <TextInput 
//                       placeholder="Room Name"
//                       placeholderTextColor="#C7C2C2"
//                       style={[styles.textInput, {
//                              color: colors.text
//                           }]}
//                           autoCapitalize="none"
//                           onChangeText={(val) => setRoomName(val)}
//                           onEndEditing={(val) => setRoomName(val)}
//                           keyboardType = "email-address" 
//                       /> 
                             
//                         <TouchableOpacity
//                             onPress={() => imagePicker()}
//                             style={[styles.imagePick, {
//                                 borderColor: '#009387',
//                                 borderWidth: 1,
//                                 marginTop: 15
//                             }]}
//                         >
//                             <Text style={[styles.textSign, {
//                                 color: '#009387'
//                             }]}>Upload Image</Text>
//                         </TouchableOpacity>

//                     <View style={styles.buttonAction}>
//                         <Button style={styles.button} color='#fff' onPress={()=> hideModal()} >Cancel</Button>
//                         <Button style={styles.button} color='#fff' onPress={()=> console.log('presed')} >Done</Button>
//                     </View>
//             </View>
                   
//             </Modal>
//           </Portal>
//        </Provider>    


// <LottieView source={require('../assets/loading.json')} autoPlay loop />

// <ActivityIndicator size="large" color="#00ff00" />


// <View style={styles.applianceView}>                             
//                               <Image style={styles.image}
//                                   source={{ uri: item.url }} />
//                               <Text style={styles.text1}>{item.name}</Text> 
//                               <Switch value={item.status} onValueChange={(val)=> toggle(val, item.id) } 
//                                 style={styles.switch}
//                               // onTintColor="#00ff00"
//                               // thumbTintColor="#0000ff"
//                               // tintColor="#ff0000"
//                                />
//   onRefresh = {()=>fetchData(userid, roomid)}    				        		</View>


// const RoomCard = (props, {...rest}) => {
// 	const navigation = useNavigation();
// 	return (
// 		<View style={styles.container}>
// 			<TouchableOpacity style={styles.btnView}  onPress={() => navigation.navigate('Room', { name: props.title, roomId: props.roomId })} >
// 				<Image style={styles.image}
// 					source={{ uri: props.url }} />
// 				<Text style={styles.text}>{props.title}</Text>
// 			</TouchableOpacity>
// 		</View>
// 	)
// }
