import { Camera } from 'expo-camera';
import { useState , useRef , useEffect, Component} from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import config from './config'
let contactRemember = [];

let camera : Camera
const axios = require("axios");

export function HomeScreen({ navigation }, props) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const SECOND_MS = 10000;
  const isFocused = useIsFocused();
  const accountSid = config.ACCOUNT_SID;
  const authToken = config.AUTH_TOKEN;
  const roboflow_api_key = config.ROBOFLOW_API_KEY;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  let flareoffnum = 0;


/* Send a message with the given body */ 
  const message = (body) => {
    const params = new URLSearchParams();
    params.append('Body', body);
    params.append('To', '');
    params.append('From','+13856660216');
    
    for (let i = 0; i < contactRemember.length; i++) {

      // Create parameter object to contain parameters for requests

      // Append the given body, the (hopefully) pre-set contact, and the twilio from section
      params.set('To', contactRemember[i]);
      
      console.log(contactRemember);

      // Axios post request
      axios.post(

        // URL to post the request to
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,

        // list of params to send to the endpoint
        params,

        // authentification information
        { 
          auth: {
            username: accountSid,
            password: authToken
          }
        }

      // if an error occurs during the post request, log the erro
      ).catch(error => {
        console.log(error.response)
        }
      );
    };
  };

// Async function that takes a picture when called
  const takePicture = async () => {

    // Check to see if the camera is a living object
    if (camera)
    {
      // Define options for the photo
      const options = { quality: 0.5, base64: false, skipProcessing: true };

      // If so take the photo and wait for it to be taken
      const photo : any = await camera.takePictureAsync(options);

      // retrieve the source from the photo
      const binaryDataInBase64 = new FormData();
        binaryDataInBase64.append('file', {
            // data: response.data,
            uri: photo.uri,
            name: 'MMM.jpg',
            type: photo.type
        })

      // Make a post request to the roboflow api
      axios({

        // post request
        method: "POST",

        // path to model endpoint
        url: "https://classify.roboflow.com/flares-dataset-new/5",

        // parameters
        params: {

          // roboflow private api key (CHANGE TO GET FROM ENV)
          api_key: "GCPJ40FCMkvr5qqjhDiF" 
        },

        // data will be the URI for the image
        data: binaryDataInBase64,

        // Set content-type headers
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      // this is called when the function returns a valid response
      .then(function(response) {

        console.log(response);
        // Message with the top prediction from the model if flare is off
        //if ((response.data.top).includes("Off")) {
          message(response.data.top);
        //}
        //else {
          console.log("Woah");
        //}
      })

      // This is called when the function returns an error
      .catch(function(error) {
        
        // Log the error message to the console
        console.log(error.response.data);
      });
    }
  };


// This useEffect starts the timer
useEffect(() => {

  // start an recurring interval
  const interval = setInterval(() => {
    const takePicture = async () => {

      // Check to see if the camera is a living object
      if (camera) {
        // Define options for the photo
        const options = { quality: 0.5, base64: false, skipProcessing: true };
  
        // If so take the photo and wait for it to be taken
        const photo : any = await camera.takePictureAsync(options);
  
        // retrieve the source from the photo
        const binaryDataInBase64 = new FormData();
          binaryDataInBase64.append('file', {
              // data: response.data,
              uri: photo.uri,
              name: 'MMM.jpg',
              type: photo.type
          })
  
        // Make a post request to the roboflow api
        axios({
  
          // post request
          method: "POST",
  
          // path to model endpoint
          url: "https://classify.roboflow.com/flares-dataset-new/5",
  
          // parameters
          params: {
  
            // roboflow private api key (CHANGE TO GET FROM ENV)
            api_key: "GCPJ40FCMkvr5qqjhDiF" 
          },
  
          // data will be the URI for the image
          data: binaryDataInBase64,
  
          // Set content-type headers
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        // this is called when the function returns a valid response
        .then(function(response) {
          // Message with the top prediction from the model if flare is off
          //if ((response.data.top).includes("Off")) {
          console.log(response.data.top);
          //}
          if ((response.data.top).includes("Off")) {
            flareoffnum++;
            console.log(flareoffnum);
            if (flareoffnum === 4) {
              console.log("yo confirmed flare off");
            }
          }
          else {
            flareoffnum = 0;
          }
        })
  
        // This is called when the function returns an error
        .catch(function(error) {
          
          // Log the error message to the console
          console.log(error.response.data);
        })
      }
    };
    takePicture();
  }, SECOND_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (permission && permission.granted && isFocused){
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back}
      ref={(r) => {
            camera = r
          }}>
      </Camera>
      <View style={styles.buttonContainer}>
        <Button
          id="pic_button"
          title="Take Picture"
          onPress = {takePicture}
        />
        <Button 
          title="Contacts Page"
          onPress={() => navigation.navigate('Contacts')}
        />
      </View>
    </View>
  );}
}

function ContactsScreen() {
  const [contact, setContact] = useState(contactRemember)                             // woah contacts___________________________________________________________
  const [enteredContactText,setEnteredContactText] = useState('');

  function contactInputHandler(enteredText) {
    setEnteredContactText(enteredText);
  }

  function addContactHandler() {
    console.log(enteredContactText);
    setContact((currentContact) => [...contact, enteredContactText]);
    contactRemember = [...contactRemember, enteredContactText];
    console.log(contactRemember);
  }
  
  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Input Contact' onChangeText= {contactInputHandler} style={styles.inputText}/>
        <Button title='Enter ↓' onPress= {addContactHandler}/>
      </View>
      <View style={styles.contactsList}>
        {contact.map((contact, index) =>
          <View style={styles.mapContainer}>
            <View style={styles.contactsListContainer}>
              <View style={{width: '80%'}}>
                <Text style={styles.contactText}>{(index + 1) + '. ' + contact}</Text>
              </View>
            </View> 
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={attemptInvisibleVerification=false}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 9,
    width: '85%',
    padding: 8,
    marginTop: 50,
    margin: 25,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 20,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
    backgroundScreen: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 7,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contactsList: {
    flex: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    margin: 10,
    alignItems: 'center',
  },
  mapContainer: {
    padding: 5,
    width: '100%'
  },
  contactsListContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    width: '75%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    placeholderTextColor: '#999999'
  },
  contactText: {
    fontSize: 20,
  }
});