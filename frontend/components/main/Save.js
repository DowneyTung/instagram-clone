import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'

require("firebase/firestore")
require("firebase/firebase-storage")


export default function Save(props) {
  console.log('image uri printed as ', props.route.params.image)
  const [caption, setCaption] = useState("")

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`

    const response = await fetch(uri); //fetch the image and getting the data from the image 
    const blob = await response.blob(); //responsible for uploading tthe image, it will create a blob, then pass along to firestore and then upload the image
    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob);

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot)
      })
    }

    const taskError = snapshot => {
      console.log(snapshot)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  }

  const savePostData = (downloadURL) => {
    firebase.firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        liksCount: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      }).then((function () {
        props.navigation.popToTop()
      }))
  }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption"
        onChangeText={(caption) => setCaption(caption)}

      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  )
}
